import { type Locator, type Page } from "@playwright/test";

export class DefaultScreenPage {
  //identifikace prvku a dalsich properties
  private readonly page: Page;
  private readonly url = "https://tredgate.com/eshop/";
  private readonly myAccountMenu: Locator;
  private readonly registerButton: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly iphoneLink: Locator;
  private readonly addToCartButton: Locator;
  //constructor v kterem nastavime jednotlive lokatory
  constructor(page: Page) {
    this.page = page;
    this.myAccountMenu = page.locator("#top-links a i.fa-user");
    this.registerButton = page.locator(
      '.dropdown-menu a[href="https://tredgate.com/eshop/index.php?route=account/register"]'
    );
    this.searchInput = page.locator('[name="search"]');
    this.searchButton = page.locator('#search [type="button"]');
    this.iphoneLink = page.locator('//a[text()="iPhone"]');
    this.addToCartButton = page.locator("#button-cart");
  }
  //ovladaci metody
  async openEshop() {
    await this.page.goto(this.url);
  }

  async clickAccount() {
    await this.myAccountMenu.click();
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async fillSearch(productName: string) {
    await this.searchInput.fill(productName);
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async openProductDetail() {
    await this.iphoneLink.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
