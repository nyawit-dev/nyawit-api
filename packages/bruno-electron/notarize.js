require('dotenv').config({ path: process.env.DOTENV_PATH });
const fs = require('fs');
const path = require('path');

const notarizeApp = async function (params) {
  if (process.platform !== 'darwin') {
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
    console.log('Skipping notarization: APPLE_ID or APPLE_ID_PASSWORD not provided.');
    return;
  }

  let appId = 'com.nyawitapi.app';

  let appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`);
  if (!fs.existsSync(appPath)) {
    console.error(`Cannot find application at: ${appPath}`);
    return;
  }

  console.log(`Notarizing ${appId} found at ${appPath} using Apple ID ${process.env.APPLE_ID}`);
  const teamId = process.env.APPLE_TEAM_ID || 'W7LPPWA48L';
  try {
    // @electron/notarize is ESM-only
    const { notarize } = await import('@electron/notarize');
    await notarize({
      appPath: appPath,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
      teamId: teamId
    });
  } catch (error) {
    console.error(error);
  }

  console.log(`Done notarizing ${appPath}`);
};

module.exports = notarizeApp;
