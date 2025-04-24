import { test, expect } from "@playwright/test";
import { DefaultScreenPage } from "../../src/pages/tredgate-eshop/defaultScreen_page.ts";

test.describe("Kontrola prvku na uvodni strance eshopu", () => {
  test.beforeEach(async ({ page }) => {
    const defaultPage = new DefaultScreenPage(page);
    await defaultPage.openEshop();
  });

  test("Logo a cart are visible", async ({ page }) => {
    const defaultPage = new DefaultScreenPage(page);
    await defaultPage.expectLogoVisible();
    await defaultPage.expectCartButtonVisible();
  });

  test("Pole Search ma správnou hodnotu po vyplneni", async ({ page }) => {
    const defaultPage = new DefaultScreenPage(page);
    const testValue = "test";
    await defaultPage.fillSearch(testValue);
    await expect(defaultPage.searchInput).toHaveValue(testValue);
  });

  test("Zobrazeni nadpisu Featured", async ({ page }) => {
    const defaultPage = new DefaultScreenPage(page);
    await defaultPage.expectFeaturedTitle();
  });

  test("Footer - Information", async ({ page }) => {
    const defaultPage = new DefaultScreenPage(page);
    await defaultPage.expectFooterInformationVisible();
  });
});
