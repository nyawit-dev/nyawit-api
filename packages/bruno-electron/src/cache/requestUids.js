/**
 * we maintain a cache of request uids to ensure that we
 * preserve the same uid for a request even when the request
 * moves to a different location
 *
 * In the past, we used to generate unique ids based on the
 * pathname of the request, but we faced problems when implementing
 * functionality where the user can move the request to a different
 * location. In that case, the uid would change, and we would
 * lose the request's draft state if the user has made some changes
 */

const path = require('node:path');
const requestUids = new Map();
const exampleUids = new Map();
const { uuid } = require('../utils/common');

const normalizePathKey = (pathname) => {
  if (typeof pathname !== 'string') return pathname;
  let resolved = path.resolve(pathname);
  if (process.platform === 'win32') {
    resolved = resolved.toLowerCase();
  }
  return resolved;
};

const getRequestUid = (pathname) => {
  const key = normalizePathKey(pathname);
  let uid = requestUids.get(key);

  if (!uid) {
    uid = uuid();
    requestUids.set(key, uid);
  }

  return uid;
};

const moveRequestUid = (oldPathname, newPathname) => {
  const oldKey = normalizePathKey(oldPathname);
  const newKey = normalizePathKey(newPathname);
  const uid = requestUids.get(oldKey);

  if (uid) {
    requestUids.delete(oldKey);
    requestUids.set(newKey, uid);
  }
};

const deleteRequestUid = (pathname) => {
  requestUids.delete(normalizePathKey(pathname));
};

/**
 * Purges every cached uid (request + example) that lives under a collection's
 * root path. Called on collection removal so a later re add at the same path
 * (same deterministic collectionUid) starts from a clean slate instead of
 * inheriting uids tied to files that may no longer exist or mean something else.
 */
const clearRequestUidsForCollection = (collectionPath) => {
  const root = normalizePathKey(collectionPath);
  const prefix = root.endsWith(path.sep) ? root : root + path.sep;

  for (const key of requestUids.keys()) {
    if (key === root || key.startsWith(prefix)) {
      requestUids.delete(key);
    }
  }

  for (const key of exampleUids.keys()) {
    if (key === root || key.startsWith(prefix)) {
      exampleUids.delete(key);
    }
  }
};

const getExampleUid = (pathname, index) => {
  const baseKey = normalizePathKey(pathname);
  const key = `${baseKey}-${index}`;
  let uid = exampleUids.get(key);

  if (!uid) {
    uid = uuid();
    exampleUids.set(key, uid);
  }

  return uid;
};

/**
 * Syncs the example UID cache with the current state of examples being saved.
 * This ensures the cache stays consistent when examples are added, deleted, or reordered.
 *
 * @param {string} pathname - The file path of the request
 * @param {Array} examples - The examples array being saved (each with a uid property)
 */
const syncExampleUidsCache = (pathname, examples = []) => {
  const baseKey = normalizePathKey(pathname);
  // Clear all existing cache entries for this pathname
  for (const key of exampleUids.keys()) {
    if (key.startsWith(`${baseKey}-`)) {
      exampleUids.delete(key);
    }
  }

  // Rebuild cache with current example UIDs at their new indices
  examples.forEach((example, index) => {
    if (example.uid) {
      exampleUids.set(`${baseKey}-${index}`, example.uid);
    }
  });
};

module.exports = {
  getRequestUid,
  moveRequestUid,
  deleteRequestUid,
  getExampleUid,
  syncExampleUidsCache,
  clearRequestUidsForCollection
};
