import { expect, type Locator, type Page } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { LostPasswordPage } from "./lost_password_page.ts";

export class LoginPage {
  profileButtonIsVisible(): any {
    throw new Error("Method not implemented.");
  }
  //identifikace prvku a dalsich properties
  private readonly page: Page;
  private readonly url = "https://tredgate.com/pmtool/";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly passwordForgottenAnchor: Locator;
  private readonly pageHeader: Locator;

  //constructor v kterem nastavime jednotlive lokatory
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(".btn");
    this.passwordForgottenAnchor = page.locator("#forget_password");
    this.pageHeader = page.locator("h3.form-title");
  }
  //ovladaci metody
  async typeUsername(username: string): Promise<LoginPage> {
    await this.usernameInput.fill(username);
    return this;
  }

  async openPmtool(): Promise<LoginPage> {
    await this.page.goto(this.url);
    return this;
  }

  async typePassword(password: string): Promise<LoginPage> {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin(): Promise<DashboardPage> {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async login(username: string, password: string): Promise<DashboardPage> {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickLogin();
    return new DashboardPage(this.page);
  }

  async clickPasswordForgotten(): Promise<LostPasswordPage> {
    await this.passwordForgottenAnchor.click();
    return new LostPasswordPage(this.page);
  }

  async pageHeaderHasText(headerText: string): Promise<LoginPage> {
    await expect(this.pageHeader).toHaveText(headerText);
    return this;
  }
}
