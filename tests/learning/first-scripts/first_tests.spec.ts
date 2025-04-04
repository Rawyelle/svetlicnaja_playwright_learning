import { test } from "@playwright/test";

//pwt = pwt-test ud2la tuto strukturu
test("Prvni test", async ({ page }) => {
  //testivaci kroky
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright321!");
  await page.locator(".btn").click();
});
