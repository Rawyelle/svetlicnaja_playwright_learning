import { type Locator, type Page } from "@playwright/test";
export class LoginPage {
  //identifikace prvku a dalsich properties
  private readonly page: Page;
  private readonly url = "https://tredgate.com/pmtool/";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  //constructor v kterem nastavime jednotlive lokatory
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(".btn");
  }
  //ovladaci metody
  async typeUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async openPmtool() {
    await this.page.goto(this.url);
  }

  async typePassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickLogin();
  }
}
