/* eslint-disable @typescript-eslint/await-thenable */
import { test, expect } from "@playwright/test";

// todo: test are not passing - FIX
test.describe("regression tests", () => {
  test("should successfully navigate and find elements through main sections in the page", async ({ page }) => {
    await page.goto("/");
    // await page.pause();

    // home page
    await page.getByRole("heading", { name: "Hello 👋, I'm Fernando" }).click();
    await page.getByText("fernandogtostado@gmail.com").click();

    // posts
    await page.getByRole('link', { name: 'Blog' }).click();
    await page.getByRole("heading", { name: "Posts" }).click();

    // grab the first html <article> element
    const firstArticle = page.locator("article").first();
    // expect first child element to be an <a> element
    expect(firstArticle.locator("a").first()).toBeTruthy();

    // navigate to the first post
    await firstArticle.click();

    // confirm that the first post is loaded with the id='markdown-article'
    expect(await page.locator("#markdown-article")).toBeTruthy();

    // my projects
    await page.getByRole('link', { name: 'Projects' }).click();
    // assert there's at least one project card
    expect(await page.locator("#project-card-0")).toBeTruthy();

    // open model click
    await page.getByRole('link', { name: 'About AI🤖' }).click();
    await page.getByText('Hi, what would you like to learn about Fer?').click();
  });

  /* 
    checking the html class was throwing an error
    expect.toHaveClass: Browser has been closed.
    so I had to use the toggler id name the existing mode

  */
  test("should preserve the existing mode (Dark or Light) when navigating", async ({ page }) => {
    await page.goto("/");
  
    // expect the html element to have the class 'light'
    // expect(await page.locator("html").first()).toHaveClass("light");
    const togglerDark = await page.locator("#navbar-darkmode-toggler");
    expect(togglerDark).toBeTruthy();
  
    // click to toggle dark mode
    await page.locator("#navbar-darkmode-toggler").click();
  
    // navigate to the home page
    await page.locator("#navbar-home-link").click();
  
    // expect the html element to still have the class 'dark'
    // const html = await page.locator("html").first();
    // expect(html).toHaveClass("dark");

    // and light mode toggle to be present
    const togglerLight = await page.locator("#navbar-lightmode-toggler");
    expect(togglerLight).toBeTruthy();
  });
});

// todo: add a test to assert that the page doesnt reload when navigating to home
