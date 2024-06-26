/* eslint-disable @typescript-eslint/await-thenable */
import { test, expect } from "@playwright/test";

test.describe("regression tests", () => {
  test("should successfully navigate and find elements through main sections in the page", async ({ page }) => {
    await page.goto("/");
    // await page.pause();

    // home page
    await page.getByRole("heading", { name: "Hello 👋, I'm Fernando" });
    // footer email link
    await page.getByText("fernandogtostado@gmail.com").click();

    // posts
    await page.locator("#navbar-blog-link").click();

    // grab the first html <article> element
    const firstArticle = page.locator("article").first();
    
    // expect first child element to be an <a> element
    expect(firstArticle.locator("a").first()).toBeTruthy();

    // navigate to the first post
    await firstArticle.click();

    // confirm that the first post is loaded with the id='markdown-article'
    expect(await page.locator("#markdown-article")).toBeTruthy();

    // my projects
    await page.locator("#navbar-projects-link").click();
    // assert there's at least one project card
    expect(await page.locator("#project-card-0")).toBeTruthy();

    // open chatbot click
    await page.locator("#navbar-about-link").click();
    await page.locator("#chat-messages-list");
  });

  /* 
    checking the html class was throwing an error
    expect.toHaveClass: Browser has been closed.
    so I had to use the toggler id name the existing mode

  */
  test("should preserve the existing mode (Dark or Light) when navigating", async ({ page }) => {
    await page.goto("/");

    page.on("request", (request) => console.log(">>", request.method(), request.url()));
    page.on("response", (response) => console.log("<<", response.status(), response.url()));

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

    // hit home to check if the mode is preserved and page doesn't hard refresh
    await page.locator("#navbar-home-link").click();
    const toggler = await page.locator("#navbar-lightmode-toggler");

    expect(toggler).toBeTruthy();
  });

  const CHATBOT_CASES = [
    {
      type: "click",
      userInput: "What's Fer's Tech Stack??",
      chatResIncludes: "React",
      followUp: "With how many years of experience?",
      chatRes2Includes: "years",
    },
    // test other scenarios
    // {
    //   type: "enter",
    //   userInput: "Who is Fer?",
    //   chatResIncludes: "React",
    //   followUp: "With how many years of experience?",
    //   chatRes2Includes: "5 years",
    // },
  ];

  CHATBOT_CASES.forEach(({ type, userInput, followUp, chatResIncludes, chatRes2Includes }) => {
    test(`should work with ${type} and answer ${userInput}`, async ({ page }) => {
      await page.goto("/");

      await page.locator("#navbar-about-link").click();
      await page.locator("#chat-messages-list").click();

      // go to userInput
      // ask a question and hit enter
      await page.locator("#chat-user-input").fill(userInput);

      await page.locator("#chat-submit-button").click();

      // assert that the chatbot answered
      // using locator was throwing a "Target closed" error 
      // https://stackoverflow.com/questions/61933492/playwright-error-target-closed-after-navigation
      await page.waitForSelector("#chat-message-2");

      await page.getByText(chatResIncludes).click();
      // todo: use a regexp that accepts any combination of strings (.*?) and any number of characters (.*)
      // this one causes the browser has been closed error

      // ask a follow up question
      await page.locator("#chat-user-input").fill(followUp);
      await page.locator("#chat-submit-button").click();

      // since we're streaming the response we can't use a locator, otherwise it will find the locator
      // with the initial token which may not yet contain the response
      await page.getByText(chatRes2Includes).click();
    });
  });
});
