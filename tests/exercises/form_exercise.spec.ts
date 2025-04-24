import { expect, test } from "@playwright/test";

test("Exercise: forms", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await page.locator("#full-name").fill("Olga S");
  await page.locator("#email").fill("olga@example.org");
  await page.locator("#contact-date").fill("2025-04-24");
  await page.locator('[data-testid="select-role"]').selectOption("student");
  await page.locator("#comments").fill("Test");
  await page.locator("#newsletter").check();
  await page.locator('[data-testid="button-submit"]').click();
  await expect(page.locator("#successBox")).toBeVisible();
});
