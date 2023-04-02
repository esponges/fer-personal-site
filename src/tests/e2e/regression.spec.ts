import { test, expect } from '@playwright/test';

test('simple regression test', async ({ page }) => {
  await page.goto('google.com');
  await page.pause();

  // home page
  await page.getByRole('heading', { name: 'Hello 👋, I\'m Fernando' }).click();
  await page.getByText('I\'m a software engineer from Guadalajara, Mexico. 🇲🇽 . I\'ve been coding since ').click();
  await page.getByText('fernandogtostado@gmail.com').click();

  // posts
  await page.getByRole('link', { name: 'Posts' }).click();
  await page.getByRole('heading', { name: 'Posts' }).click();

  // grab the first html <article> element
  const firstArticle = page.locator('article').first();
  // expect first child element to be an <a> element
  expect(firstArticle.locator('a').first()).toBeTruthy();

  // my projects
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await page.getByRole('heading', { name: 'Projects' }).click();
  await page.getByText('A collection of projects I\'ve worked on.').click();

  // open model click
  await page.locator('img').first().click();
  await page.getByRole('button', { name: 'Close' }).click();
});
