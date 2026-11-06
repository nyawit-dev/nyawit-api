require('dotenv').config({ path: process.env.DOTENV_PATH });

const isBenchmark = process.env.BRUNO_BENCHMARK === 'true';

const config = {
  appId: 'com.nyawitapi.app',
  productName: isBenchmark ? 'Nyawit API Benchmark' : 'Nyawit API',
  copyright: 'Copyright © 2026 nyawit.dev',
  legalTrademarks: 'nyawit.dev',
  publish: {
    provider: 'github',
    owner: 'nyawit-dev',
    repo: 'nyawit-api'
  },
  extraMetadata: {
    author: {
      name: 'nyawit.dev',
      email: 'ringga.itdev@batamfast.com',
      url: 'https://github.com/nyawit-dev/nyawit-api'
    },
    brunoBuild: {
      benchmark: isBenchmark,
      builtAt: new Date().toISOString()
    }
  },
  electronVersion: '43.8.4',
  npmRebuild: false,
  directories: {
    buildResources: 'resources',
    output: 'out'
  },
  extraResources: [
    {
      from: 'resources/data/sample-collection.json',
      to: 'data/sample-collection.json'
    }
  ],
  files: ['**/*'],
  afterSign: 'notarize.js',
  executableName: 'NyawitApi',
  mac: {
    artifactName: 'NyawitApi_${version}_${arch}_${os}.${ext}',
    category: 'public.app-category.developer-tools',
    target: [
      {
        target: 'dmg',
        arch: ['x64', 'arm64']
      },
      {
        target: 'zip',
        arch: ['x64', 'arm64']
      }
    ],
    icon: 'resources/icons/mac/icon.icns',
    hardenedRuntime: false,
    identity: null,
    notarize: false,
    requirements: 'resources/app-requirements.txt',
    protocols: [
      {
        name: 'Nyawit API',
        schemes: [
          'nyawitapi'
        ]
      }
    ]
  },
  dmg: {
    title: '${productName} ${version} ${arch}',
    icon: 'resources/icons/mac/icon.icns',
    sign: false,
    writeUpdateInfo: false
  },
  linux: {
    artifactName: 'NyawitApi_${version}_${arch}_${os}.${ext}',
    icon: 'resources/icons/png',
    vendor: 'nyawit.dev',
    maintainer: 'nyawit.dev <ringga.itdev@batamfast.com>',
    target: [
      {
        target: 'AppImage',
        arch: ['x64']
      },
      {
        target: 'deb',
        arch: ['x64']
      }
    ],
    protocols: [
      {
        name: 'Nyawit API',
        schemes: ['nyawitapi']
      }
    ],
    category: 'Development',
    synopsis: 'Local-first API IDE and client',
    description: 'Local-first, git-friendly API IDE and client for modern developers.',
    desktop: {
      entry: {
        MimeType: 'x-scheme-handler/nyawitapi;'
      }
    }
  },
  deb: {
    // Docs: https://www.electron.build/configuration/linux#debian-package-options
    depends: [
      'libgtk-3-0',
      'libnotify4',
      'libnss3',
      'libxss1',
      'libxtst6',
      'xdg-utils',
      'libatspi2.0-0',
      'libuuid1',
      'libsecret-1-0',
      'libasound2' // #1036
    ]
  },
  // Bundle git so Snap/sandbox installs can find it (#5667)
  snap: {
    stagePackages: ['default', 'git'],
    // electron-builder's app part strips usr/bin, so expose git from git-core
    environment: {
      PATH: '$SNAP/usr/lib/git-core:$SNAP/usr/sbin:$SNAP/usr/bin:$SNAP/sbin:$SNAP/bin:$PATH',
      GIT_EXEC_PATH: '$SNAP/usr/lib/git-core'
    }
  },
  win: {
    artifactName: 'NyawitApi_${version}_${arch}_win.${ext}',
    icon: 'resources/icons/win/icon.ico',
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      }
    ]
  },
  nsis: {
    include: 'resources/installer.nsh',
    oneClick: false,
    perMachine: false,
    allowElevation: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    runAfterFinish: true,
    shortcutName: 'Nyawit API',
    installerIcon: 'resources/icons/win/icon.ico',
    uninstallerIcon: 'resources/icons/win/icon.ico',
    uninstallDisplayName: 'Nyawit API ${version}'
  }
};

module.exports = config;
