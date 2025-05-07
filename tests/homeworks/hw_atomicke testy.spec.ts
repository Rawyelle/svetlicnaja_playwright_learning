import { test, expect } from "@playwright/test";
import { IphoneProductPage } from "../../src/pages/tredgate-eshop/iphone_product_page.ts";

test.describe("iPhone product page HW", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://tredgate.com/eshop/index.php?route=product/product&product_id=40"
    );
  });

  test("Kontrola viditelnosti a textu", async ({ page }) => {
    const defaultPage = new IphoneProductPage(page);

    await expect.soft(defaultPage.wishAndCompareButtons).toBeVisible();
    await expect.soft(defaultPage.productTitle).toHaveText("iPhone");
    await expect.soft(defaultPage.brandKey).toContainText("Brand:");
    await expect.soft(defaultPage.brandValue).toContainText("Apple");
    await expect
      .soft(defaultPage.productCode)
      .toContainText("Product Code: product 11");
    await expect
      .soft(defaultPage.availability)
      .toContainText("Availability: In Stock");
    await expect.soft(defaultPage.price).toHaveText("$101.00");
    await expect.soft(defaultPage.tax).toContainText("Ex Tax: $101.00");
    await expect.soft(defaultPage.quantityInput).toBeVisible();
    await expect.soft(defaultPage.addToCartButton).toBeVisible();
  });

  test("Funkcionalita tlacitka Add to Cart", async ({ page }) => {
    const defaultPage = new IphoneProductPage(page);
    await defaultPage.clickAddToCart();
    await expect.soft(page.locator(".alert-success")).toBeVisible();
  });
});
