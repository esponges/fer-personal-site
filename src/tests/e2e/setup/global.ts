import type { BrowserContext } from '@playwright/test';
import { chromium } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

type Cookie = Parameters<BrowserContext['addCookies']>[0][0];
const testCookie: Cookie = {
  name: 'next-auth.session-token',
  value: 'd52f0c50-b8e3-4326-b48c-4d4a66fdeb64', // some random id
  domain: 'localhost',
  // url: 'localhost',
  path: '/',
  expires: 1678926378, // some random date, can be expired doesn't matter
  httpOnly: true,
  secure: false,
  sameSite: 'Lax',
};

export default async function globalSetup() {
  const storageStatePath = path.resolve(__dirname, 'storage-state.json');

  // Check if the storage state file exists, and if it does, load the cookies
  try {
    const storageState = path.resolve(__dirname, 'storage-state.json');
    const browser = await chromium.launch();
    const context = await browser.newContext({ storageState });

    await context.addCookies([testCookie]);
    /* TODO
      figure out why cookies are not visible in the browser application context
      https://stackoverflow.com/questions/75893915/playwrigth-cant-set-cookies-in-the-context
    */
    await context.storageState({ path: storageState });

    // log context cookies
    const cook = await context.cookies();
    console.log(cook);
    await browser.close();
  } catch (err) {
    console.error(`Error loading storage state:`);
  }

  // Save the cookie to the storage state file
  const newStorageState = { cookies: [testCookie], origins: [] };
  try {
    await fs.writeFile(storageStatePath, JSON.stringify(newStorageState), 'utf8');
  } catch (err) {
    console.error(`Error saving storage state:`);
  }
}
