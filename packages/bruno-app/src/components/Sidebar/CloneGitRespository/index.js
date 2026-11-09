import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  browseDirectory,
  cloneGitRepository,
  fetchBranchesForRepositoryUrl,
  openMultipleCollections,
  scanForBrunoFiles
} from 'providers/ReduxStore/slices/collections/actions';
import { removeGitOperationProgress } from 'providers/ReduxStore/slices/app';
import Modal from 'components/Modal';
import SelectionFooter from 'components/SelectionFooter';
import path, { getRelativePath } from 'utils/common/path';
import Portal from 'components/Portal';
import { IconRefresh, IconAlertCircle, IconBrandGit, IconChevronDown } from '@tabler/icons';
import { uuid } from 'utils/common/index';
import StyledWrapper from './StyledWrapper';
import SelectionList from 'components/SelectionList';
import Button from 'ui/Button';
import Select from 'ui/Select';
import { getRepoNameFromUrl } from 'utils/git';
import GitNotFoundModal from 'components/Git/GitNotFoundModal/index';
import SkippedPathsWarning from 'components/SkippedPathsWarning';
import toast from 'react-hot-toast';
import get from 'lodash/get';

const EMPTY_BRANCH_LISTING = { branches: [], defaultBranch: '', loading: false, failed: false };

const CloneGitRepository = ({ onClose, onFinish, collectionRepositoryUrl = null }) => {
  const [collectionPaths, setCollectionPaths] = useState([]);
  const [skippedCollectionPaths, setSkippedCollectionPaths] = useState([]);
  const [selectedCollectionPaths, setSelectedCollectionPaths] = useState([]);
  const [processUid, setProcessUid] = useState(uuid());
  const [steps, setSteps] = useState([]);
  const [view, setView] = useState('form');
  const [branchListing, setBranchListing] = useState(EMPTY_BRANCH_LISTING);

  const progressData = useSelector((state) => state.app.gitOperationProgress[processUid]);
  const { gitVersion } = useSelector((state) => state.app);
  const { workspaces, activeWorkspaceUid } = useSelector((state) => state.workspaces);
  const preferences = useSelector((state) => state.app.preferences);
  const activeWorkspace = workspaces.find((w) => w.uid === activeWorkspaceUid);
  const isDefaultWorkspace = !activeWorkspace || activeWorkspace.type === 'default';
  const defaultLocation = isDefaultWorkspace
    ? get(preferences, 'general.defaultLocation', '')
    : (activeWorkspace?.pathname ? path.join(activeWorkspace.pathname, 'collections') : '');
  const inputRef = useRef();
  const lastFetchedUrlRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (progressData) {
      setSteps((prev) =>
        prev.map((step) =>
          step.step === 'clone' && !step?.completed
            ? { ...step, title: 'Cloning repository', completed: false, info: progressData.progressData }
            : step
        )
      );
    }
  }, [progressData]);

  const loadBranches = async (url) => {
    if (!url || typeof url !== 'string') {
      setBranchListing(EMPTY_BRANCH_LISTING);
      return;
    }
    const cleanUrl = url.trim();
    if (!cleanUrl) {
      setBranchListing(EMPTY_BRANCH_LISTING);
      return;
    }

    setBranchListing({ ...EMPTY_BRANCH_LISTING, loading: true });
    try {
      const result = await dispatch(fetchBranchesForRepositoryUrl(cleanUrl));
      const branches = Array.isArray(result?.branches) ? result.branches : [];
      const defaultBranch = result?.defaultBranch || (branches.length > 0 ? branches[0] : '');
      setBranchListing({ branches, defaultBranch, loading: false, failed: false });
    } catch (error) {
      console.error(error);
      setBranchListing({ ...EMPTY_BRANCH_LISTING, failed: true });
    }
  };

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
    if (collectionRepositoryUrl) {
      loadBranches(collectionRepositoryUrl);
    }
  }, []);

  const cloneInProgress = () => {
    setSteps((prev) => [
      ...prev,
      {
        step: 'clone',
        title: 'Cloning repository',
        completed: false
      }
    ]);
  };

  const cloneFinished = () => {
    toast.success('Repository cloned successfully');
    setSteps((prev) =>
      prev.map((step) =>
        step.step === 'clone'
          ? { ...step, title: 'Cloning successful', completed: true, info: '' }
          : step
      )
    );
  };

  const cloneError = () => {
    setSteps((prev) =>
      prev.map((step) =>
        step.step === 'clone'
          ? { ...step, title: 'Cloning failed', completed: true, error: true }
          : step
      )
    );
  };

  const scanInProgress = () => {
    setSteps((prev) => [
      ...prev,
      {
        step: 'scan',
        title: 'Scanning for Bruno files',
        completed: false
      }
    ]);
  };

  const scanFinished = () => {
    toast.success('Repository scanned successfully');
    setSteps((prev) =>
      prev.map((step) =>
        step.step === 'scan' ? { ...step, title: 'Scan successful', completed: true, info: '' } : step
      )
    );
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      repositoryUrl: collectionRepositoryUrl || '',
      collectionLocation: defaultLocation,
      branch: ''
    },
    validationSchema: Yup.object({
      repositoryUrl: Yup.string().required('Repository URL is required'),
      collectionLocation: Yup.string().min(1, 'Location is required').required('Location is required')
    }),
    onSubmit: async (values) => {
      try {
        setView('progress');
        cloneInProgress();
        const { repositoryUrl, collectionLocation, branch } = values;

        const repoName = getRepoNameFromUrl(repositoryUrl);
        const targetPath = path.join(collectionLocation, repoName);

        await dispatch(
          cloneGitRepository({
            url: repositoryUrl,
            path: targetPath,
            processUid,
            branch: branch || branchListing.defaultBranch
          })
        );

        cloneFinished();
        dispatch(removeGitOperationProgress(processUid));

        scanInProgress();
        const scanResult = await dispatch(scanForBrunoFiles(targetPath));

        scanFinished();
        setCollectionPaths(scanResult?.items || []);
        setSkippedCollectionPaths(scanResult?.skippedItems || []);
      } catch (err) {
        cloneError();
        dispatch(removeGitOperationProgress(processUid));
        console.error(err);
      }
    }
  });

  const repositoryUrlValue = formik.values.repositoryUrl;

  useEffect(() => {
    if (!repositoryUrlValue || !repositoryUrlValue.trim()) {
      lastFetchedUrlRef.current = null;
      setBranchListing(EMPTY_BRANCH_LISTING);
      return;
    }

    const cleanUrl = repositoryUrlValue.trim();
    if (cleanUrl === lastFetchedUrlRef.current) {
      return;
    }

    const isPlausible =
      cleanUrl.includes('://') ||
      cleanUrl.startsWith('git@') ||
      cleanUrl.endsWith('.git') ||
      cleanUrl.includes('github.com') ||
      cleanUrl.includes('gitlab.com') ||
      cleanUrl.includes('bitbucket.org');

    if (!isPlausible) {
      return;
    }

    const timer = setTimeout(() => {
      lastFetchedUrlRef.current = cleanUrl;
      loadBranches(cleanUrl);
    }, 500);

    return () => clearTimeout(timer);
  }, [repositoryUrlValue]);

  useEffect(() => {
    if (branchListing.defaultBranch && !formik.values.branch) {
      formik.setFieldValue('branch', branchListing.defaultBranch);
    }
  }, [branchListing.defaultBranch]);

  const browse = () => {
    dispatch(browseDirectory())
      .then((dirPath) => {
        if (typeof dirPath === 'string') {
          formik.setFieldValue('collectionLocation', dirPath);
        }
      })
      .catch((error) => {
        formik.setFieldValue('collectionLocation', '');
        console.error(error);
      });
  };

  const handleCollectionSelect = (collectionPathname) => {
    setSelectedCollectionPaths((prevSelected) =>
      prevSelected.includes(collectionPathname)
        ? prevSelected.filter((pathname) => pathname !== collectionPathname)
        : [...prevSelected, collectionPathname]
    );
  };

  const handleSelectAllCollections = (e, filteredCollectionPaths) => {
    setSelectedCollectionPaths((prevSelected) => (
      e.target.checked
        ? Array.from(new Set([...prevSelected, ...filteredCollectionPaths]))
        : prevSelected.filter((pathname) => !filteredCollectionPaths.includes(pathname))
    ));
  };

  const isScanCompleted = () => steps.some((step) => step.step === 'scan' && step.completed);

  const isConfirmDisabled = () => isScanCompleted() && collectionPaths?.length > 0 && selectedCollectionPaths?.length === 0;

  const isFooterHidden = () => steps.some((step) => !step.completed);

  const isError = () => steps.some((step) => step.error);

  const handleBackButtonClick = () => {
    setView('form');
    setSteps([]);
    setSelectedCollectionPaths([]);
  };

  const renderFooterLeft = () => {
    if (isError()) {
      return (
        <Button
          type="button"
          variant="ghost"
          color="secondary"
          onClick={handleBackButtonClick}
          data-testid="clone-git-repository-modal-back-btn"
        >
          Back
        </Button>
      );
    }
    if (isScanCompleted() && collectionPaths?.length > 0) {
      return (
        <SelectionFooter>
          <span>{selectedCollectionPaths.length}</span> of {collectionPaths.length} selected
        </SelectionFooter>
      );
    }
    return null;
  };

  const handleConfirm = () => {
    const buttonText = getConfirmText();
    switch (buttonText) {
      case 'Clone':
        formik.handleSubmit();
        break;
      case 'Close':
        onClose();
        break;
      case 'Open':
        if (collectionPaths.length > 0 && selectedCollectionPaths.length > 0) {
          dispatch(openMultipleCollections(selectedCollectionPaths));
          onClose();
          onFinish();
        }
        break;
      default:
        break;
    }
  };

  const getConfirmText = () =>
    !steps.length
      ? 'Clone'
      : steps.some((step) => !step.completed || step.error || (isScanCompleted() && !collectionPaths?.length))
        ? 'Close'
        : 'Open';

  if (!gitVersion) {
    return <GitNotFoundModal onClose={onClose} />;
  }

  return (
    <Portal id="clone-repository-portal">
      <Modal
        size="md"
        title="Clone Git Repository"
        confirmText={getConfirmText()}
        handleConfirm={handleConfirm}
        handleCancel={onClose}
        confirmDisabled={isConfirmDisabled()}
        hideFooter={isFooterHidden()}
        hideCancel={isError() || (isScanCompleted() && !collectionPaths?.length)}
        footerLeft={renderFooterLeft()}
      >
        <StyledWrapper>
          {view === 'form' && (
            <form className="bruno-form" onSubmit={(e) => e.preventDefault()}>
              <div>
                {collectionRepositoryUrl
                  ? (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <IconBrandGit className="w-6 h-6 text-purple-500" stroke={1.5} />
                        </div>
                        <div className="ml-4">
                          <div className="font-semibold text-sm">{getRepoNameFromUrl(collectionRepositoryUrl)}</div>
                          <div className="mt-1 text-xs text-muted font-mono">
                            {collectionRepositoryUrl}
                          </div>
                        </div>
                      </div>
                    )
                  : (
                      <>
                        <label htmlFor="repository-url" className="flex items-center font-semibold">
                          Git Repository URL
                        </label>
                        <input
                          id="repository-url"
                          type="text"
                          name="repositoryUrl"
                          ref={inputRef}
                          className="block textbox mt-2 w-full"
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck="false"
                          onChange={formik.handleChange}
                          onBlur={(e) => {
                            formik.handleBlur(e);
                            const clean = e.target.value?.trim();
                            if (clean && clean !== lastFetchedUrlRef.current) {
                              lastFetchedUrlRef.current = clean;
                              loadBranches(clean);
                            }
                          }}
                          onPaste={(e) => {
                            const pasted = e.clipboardData?.getData('text')?.trim();
                            if (pasted) {
                              lastFetchedUrlRef.current = pasted;
                              loadBranches(pasted);
                            }
                          }}
                          value={formik.values.repositoryUrl || ''}
                        />
                      </>
                    )}
                {formik.touched.repositoryUrl && formik.errors.repositoryUrl && (
                  <div className="text-red-500">{formik.errors.repositoryUrl}</div>
                )}
                <label htmlFor="collection-location" className="block font-semibold mt-3">
                  Location
                </label>
                <input
                  id="collection-location"
                  type="text"
                  name="collectionLocation"
                  readOnly
                  className="block textbox mt-2 w-full cursor-pointer"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  value={formik.values.collectionLocation || ''}
                  onClick={browse}
                />
                {formik.touched.collectionLocation && formik.errors.collectionLocation && (
                  <div className="text-red-500">{formik.errors.collectionLocation}</div>
                )}
                <div className="mt-1">
                  <span className="text-link cursor-pointer hover:underline" onClick={browse}>
                    Browse
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <label htmlFor="branch-select" className="block font-semibold">
                    Branch
                  </label>
                  {branchListing.loading ? (
                    <span className="text-xs text-muted flex items-center gap-1">
                      <IconRefresh size={12} className="animate-spin" /> Fetching branches...
                    </span>
                  ) : formik.values.repositoryUrl ? (
                    <button
                      type="button"
                      className="text-xs text-link hover:underline bg-transparent border-0 p-0 cursor-pointer flex items-center gap-1"
                      onClick={() => {
                        const val = formik.values.repositoryUrl?.trim();
                        if (val) {
                          lastFetchedUrlRef.current = val;
                          loadBranches(val);
                        }
                      }}
                      title="Reload branches"
                    >
                      <IconRefresh size={12} /> Reload branches
                    </button>
                  ) : null}
                </div>
                <Select
                  className="branch-select mt-1"
                  data={branchListing.branches}
                  value={formik.values.branch || branchListing.defaultBranch}
                  onChange={(branch) => formik.setFieldValue('branch', branch || '')}
                  searchable
                  allowDeselect={false}
                  loading={branchListing.loading}
                  rightSection={branchListing.loading ? undefined : <IconChevronDown size={12} strokeWidth={2} />}
                  disabled={!branchListing.branches.length && !branchListing.loading}
                  placeholder={
                    branchListing.loading
                      ? 'Loading branches...'
                      : branchListing.branches.length
                        ? (branchListing.defaultBranch ? `Default (${branchListing.defaultBranch})` : 'Select a branch')
                        : 'Enter repository URL to load branches'
                  }
                  nothingFoundMessage="No branches match your search"
                  data-testid="clone-git-repository-branch-select"
                />
                {branchListing.branches.length > 0 && (
                  <div className="text-muted text-xs mt-1">
                    Found {branchListing.branches.length} branch{branchListing.branches.length > 1 ? 'es' : ''}. Default: <span className="font-semibold">{branchListing.defaultBranch || 'main'}</span>
                  </div>
                )}
                {branchListing.failed && (
                  <div className="text-muted text-xs mt-1 text-yellow-600 dark:text-yellow-400">
                    Could not fetch remote branches. Cloning will use the default branch.
                  </div>
                )}
                {(!branchListing.branches.length || branchListing.failed) && !branchListing.loading && formik.values.repositoryUrl && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="branch"
                      placeholder="Or specify custom branch name (optional)"
                      className="block textbox text-xs w-full"
                      value={formik.values.branch || ''}
                      onChange={formik.handleChange}
                    />
                  </div>
                )}
              </div>
            </form>
          )}
          {view === 'progress' && (
            <>
              {steps.some((step) => !step.completed || step.error) && (
                <div className="clone-progress-steps">
                  <ul>
                    {steps.filter((step) => !step.completed || step.error).map((step, index) => (
                      <li key={index} className="flex-col items-center space-x-2 mt-1">
                        <div className="flex">
                          {step.error ? (
                            <IconAlertCircle className="clone-step-error-icon" size={18} strokeWidth={1.5} />
                          ) : (
                            <IconRefresh className="clone-step-progress-icon animate-spin" size={18} strokeWidth={1.5} />
                          )}
                          <span className="ml-2">{step.title}</span>
                        </div>
                        {step.info && (
                          <div className="w-full mt-2">
                            <pre className="info-box ml-4">{step.info}</pre>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {isScanCompleted() && (
                <div className="w-full min-w-0 flex flex-col gap-3">
                  <SkippedPathsWarning paths={skippedCollectionPaths} itemNoun="collections" />
                  {collectionPaths.length === 0 && (
                    <div className="scan-warning flex items-start gap-2">
                      <IconAlertCircle className="scan-warning-icon" size={18} strokeWidth={1.5} />
                      <div>No Bruno collections were found in this repository.</div>
                    </div>
                  )}
                  {collectionPaths.length > 0 && (
                    <SelectionList
                      title="Collections"
                      searchPlaceholder="Search Collections"
                      items={collectionPaths}
                      selectedItems={selectedCollectionPaths}
                      onSelectAll={handleSelectAllCollections}
                      onItemToggle={handleCollectionSelect}
                      getItemId={(collection) => collection.pathname}
                      renderItemTitle={(collection) => collection.name}
                      renderItemDescription={(collection) => getRelativePath(formik.values.collectionLocation, collection.pathname)}
                      visibleRows={8}
                      rowHeight={60}
                      rowGap={4}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </StyledWrapper>
      </Modal>
    </Portal>
  );
};

export default CloneGitRepository;
