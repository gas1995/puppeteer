let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content", async () => {
    await page.goto("https://github.com/team", { timeout: 2000 });
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForTimeout(300);
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  });

  test("The first link attribute", async () => {
    await page.goto("https://github.com/team", { timeout: 800 });
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.goto("https://github.com/team", { timeout: 800 });
    const btnSelector =
      "body > div.logged-out.env-production.page-responsive > div.application-main > main > div.js-build-in.position-relative.overflow-hidden.section-team-hero > div.position-relative.position-md-absolute.top-md-0.right-md-0.bottom-md-0.left-md-0.z-1 > div > div > div > div > a";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  });
});

test("The h1 header content on page actions", async () => {
  await page.goto("https://github.com/features/actions", { timeout: 1400 });
  await page.waitForSelector("h1");
  const title = await page.title();
  expect(title).toEqual("Features • GitHub Actions · GitHub");
});

test("The h1 header content on page enterprise", async () => {
  await page.goto("https://github.com/enterprise", { timeout: 1800 });
  await page.waitForSelector("h1");
  const title = await page.title();
  expect(title).toEqual("The AI Powered Developer Platform. · GitHub");
});

test("The h1 header content on page sponsors", async () => {
  await page.goto("https://github.com/sponsors", { timeout: 900 });
  await page.waitForSelector("h1");
  const title = await page.title();
  expect(title).toEqual("GitHub Sponsors · GitHub");
});
