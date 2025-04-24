import { expect, test } from "@playwright/test";

test.describe("Mouse Actions Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
  });

  test("Hover Test", async ({ page }) => {
    await page.locator("#hover-box").hover();
    await expect(page.locator('[data-testid="hover-message"]')).toBeVisible();
  });
});
