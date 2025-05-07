import { type Locator, type Page } from "@playwright/test";

export class IphoneProductPage {
  readonly page: Page;
  readonly url =
    "https://tredgate.com/eshop/index.php?route=product/product&product_id=40 ";
  readonly wishAndCompareButtons: Locator;
  readonly productTitle: Locator;
  readonly brandKey: Locator;
  readonly brandValue: Locator;
  readonly productCode: Locator;
  readonly availability: Locator;
  readonly price: Locator;
  readonly tax: Locator;
  readonly quantityLabel: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wishAndCompareButtons = page.locator('//div[@class="btn-group"]');
    this.productTitle = page.locator(' //h1[normalize-space()="iPhone"]');
    this.brandKey = page.locator('//li[contains(text(), "Brand:")]');
    this.brandValue = page.locator('//li[contains(., "Apple")]');
    this.productCode = page.locator(
      '//li[text() = "Product Code: product 11"]'
    );
    this.availability = page.locator('//li[text() = "Availability: In Stock"]');
    this.price = page.locator('//li/h2[contains(text(), "$")]');
    this.tax = page.locator('//li[contains(text(), "Ex Tax:")]');
    this.quantityLabel = page.locator('//label[text()="Qty"]');
    this.quantityInput = page.locator('//input[@id="input-quantity"]');
    this.addToCartButton = page.locator('//button[@id="button-cart"]');
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }
}
