import { test } from "@playwright/test";
import { DefaultScreenPage } from "../../src/pages/tredgate-eshop/defaultScreen_page.ts";

test("Vyhledani iPhonu a pridani do kosiu", async ({ page }) => {
  const defaultPage = new DefaultScreenPage(page);
  await defaultPage.openEshop();
  await defaultPage.fillSearch("iPhone");
  await defaultPage.clickSearchButton();
  await defaultPage.openProductDetail();
  await defaultPage.addToCart();
});
