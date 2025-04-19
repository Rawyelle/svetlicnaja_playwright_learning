import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Test Structure - Describe", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();
  });

  test("Pmtool Login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login("pw_skoleni", "TEG2023");
  });

  test("Login and Logout", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .login("pw_skoleni", "TEG2023")
      .then((dashboard) => dashboard.clickProfile())
      .then((dashboard) => dashboard.clickLogout());
  });
});
