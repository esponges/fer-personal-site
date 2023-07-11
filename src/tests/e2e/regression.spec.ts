/* eslint-disable @typescript-eslint/await-thenable */
import { test, expect } from "@playwright/test";

test.describe("regression tests", () => {
  test("should successfully navigate and find elements through main sections in the page", async ({ page }) => {
    await page.goto("/");
    // await page.pause();

    // home page
    await page.getByRole("heading", { name: "Hello 👋, I'm Fernando" }).click();
    await page.getByText("I'm a software engineer from Guadalajara, Mexico. 🇲🇽 . I've been coding since ").click();
    await page.getByText("fernandogtostado@gmail.com").click();

    // posts
    await page.getByRole("link", { name: "Posts" }).click();
    await page.getByRole("heading", { name: "Posts" }).click();

    // grab the first html <article> element
    const firstArticle = page.locator("article").first();
    // expect first child element to be an <a> element
    expect(firstArticle.locator("a").first()).toBeTruthy();

    // my projects
    await page.getByRole("link", { name: "Projects", exact: true }).click();
    await page.getByRole("heading", { name: "Projects" }).click();
    await page.getByText("A collection of projects I've worked on.").click();

    // open model click
    await page.locator("img").first().click();
    await page.getByRole("button", { name: "Close" }).click();
  });

  test("should preserve the existing mode (Dark or Light) when navigating", async ({ page }) => {
    await page.goto("/");
    // await page.pause();
  
    // expect the html element to have the class 'light'
    expect(await page.locator("html").first()).toHaveClass("light");
  
    // click to toggle dark mode
    await page.locator("#navbar-darkmode-toggler").click();
  
    // navigate to the home page
    await page.locator("#navbar-home-link").click();
  
    // expect the html element to still have the class 'dark'
    expect(await page.locator("html").first()).toHaveClass("dark");
    // and light mode toggle to be present
    expect(await page.locator("#navbar-lightmode-toggler")).toBeTruthy();
  });
});

// todo: add a test to assert that the page doesnt reload when navigating to home
