import { type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class DashboardPage {
  //identifikace prvku a dalsich properties
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;
  //constructor v kterem nastavime jednotlive lokatory
  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
  }
  //ovladaci metody
  async clickProfile(): Promise<DashboardPage> {
    await this.page.waitForTimeout(3000);
    await this.profileButton.click();
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
