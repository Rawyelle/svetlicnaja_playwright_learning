import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";

test.describe("Asserts - Testing with Playwright", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
      .openPmtool()
      .then((login) => login.login("pw_skoleni", "TEG2023"));
  });

  test("FAILING: toContainText Test", async ({ page }) => {
    await expect(page.locator("#welcome-page-header")).toContainText(
      "Vítej v testovací aplikaci BLB"
    );
  });

  test("toHaveTextTest", async ({ page }) => {
    await expect(page.locator("#welcome-page-header")).toHaveText(
      "Vítej v testovací aplikaci Tredgate Project"
    );
  });

  test("toBeVisible", async ({ page }) => {
    await expect(page.locator(".logo img")).toBeVisible();
  });

  test("toHaveValue Test", async ({ page }) => {
    const dashboardProject = new DashboardPage(page);
    await dashboardProject.clickProjects();

    const assertText = "Test";

    await page.locator('[test_id="search_input"]').fill(assertText);
    await expect(page.locator('[test_id="search_input"]')).toHaveValue(
      assertText
    );
  });

  test("Soft Assert Test", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // ? Měkký assert, nezastaví test, pokud spadne
    await expect
      .soft(page.locator("#welcome-page-header"))
      .toHaveText("Vítej v testovací aplikaci");

    await dashboardPage
      .clickProfile()
      .then((dashboard) => dashboard.clickLogout());
  });
});

test.describe("Login Page Tests", () => {
  test("Negative Assert", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();

    // ? Tento implicitní wait nám slouží k ověření, že je stránka načtená před negativní kontrolou
    await expect(page.locator("#username")).toBeVisible();

    await expect(page.locator(".alert")).not.toBeVisible();
  });

  test("Page Objects Asserts", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
      .openPmtool()
      .then((login) => login.pageHeaderHasText("Login"));
  });
});
