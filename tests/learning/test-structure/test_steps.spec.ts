import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";

test("Using test.step", async ({ page }) => {
  await test.step("Prihlaseni do pmtool", async () => {
    const loginPage = new LoginPage(page);
    await loginPage
      .openPmtool()
      .then((login) => login.typeUsername("pw_skoleni"))
      .then((login) => login.typePassword("TEG2023"))
      .then((login) => login.clickLogin());
  });

  await test.step("Odhlaseni z pmtool", async () => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage
      .clickProfile()
      .then((dashboard) => dashboard.clickLogout());
  });
});

test("Using test.step in Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.typeUsername("pw_skoleni"))
    .then((login) => login.typePassword("TEG2023"))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.logout());
});
