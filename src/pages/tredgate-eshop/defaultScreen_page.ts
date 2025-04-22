import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class DefaultScreenPage {
  //identifikace prvku a dalsich properties
  private readonly page: Page;
  private readonly url = "https://tredgate.com/eshop/";
  private readonly logo: Locator;
  private readonly cartButton: Locator;
  private readonly featuredTitle: Locator;
  private readonly InfoInFooter: Locator;
  private readonly myAccountMenu: Locator;
  private readonly registerButton: Locator;
  readonly searchInput: Locator;
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
    this.logo = page.locator('//div[@id="logo"]');
    this.cartButton = page.locator('//div[@id="cart"]/button[@type="button"]');
    this.featuredTitle = page.locator(
      '//div[@id="content"]//h3[text()="Featured"]'
    );
    this.InfoInFooter = page.locator(
      '//div[@class="container"]//h5[text()="Information"]'
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

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async openProductDetail() {
    await this.iphoneLink.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async expectLogoVisible() {
    await expect(this.logo).toBeVisible();
    return this;
  }

  async expectCartButtonVisible() {
    await expect(this.cartButton).toBeVisible();
    await expect(this.cartButton).toHaveText(/item\(s\) - 0\.00€/); //nagooglila jsem jak yapsat ten text
    return this;
  }

  async expectSearchPlaceholder(expected: string) {
    await expect(this.searchInput).toHaveAttribute("placeholder", expected); //to taky
    return this;
  }

  async fillSearch(text: string): Promise<DefaultScreenPage> {
    await this.searchInput.fill(text);
    return this;
  }

  async expectFeaturedTitle() {
    await expect(this.featuredTitle).toBeVisible();
    return this;
  }

  async expectFooterInformationVisible() {
    await expect(this.InfoInFooter).toBeVisible();
    return this;
  }
}
