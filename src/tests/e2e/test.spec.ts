import { expect, test } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  const title = page.locator('h1');
  expect(await title.textContent()).toBe('Welcome to test!');
});

