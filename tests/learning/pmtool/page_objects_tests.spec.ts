import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Test Page objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.typeUsername("pw_academy");
  await loginPage.typePassword("Playwright321!");
  await loginPage.clickLogin();
});
