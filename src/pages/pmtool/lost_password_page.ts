import { type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class LostPasswordPage {
  //identifikace prvku a dalsich properties
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly emailInput: Locator;
  private readonly sendButton: Locator;
  private readonly backButton: Locator;
  //constructor v kterem nastavime jednotlive lokatory
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[name = "username"]');
    this.emailInput = page.locator('[name = "email"]');
    this.sendButton = page.locator('[type = "submit"]');
    this.backButton = page.locator("#back-btn");
  }
  //ovladaci metody

  async fillUsername(username: string): Promise<LostPasswordPage> {
    await this.usernameInput.fill(username);
    return this;
  }
  async fillEmail(email: string): Promise<LostPasswordPage> {
    await this.usernameInput.fill(email);
    return this;
  }

  async clickSend(): Promise<LoginPage> {
    await this.sendButton.click();
    return new LoginPage(this.page);
  }

  async clickBack(): Promise<LoginPage> {
    await this.backButton.click();
    return new LoginPage(this.page);
  }
}
