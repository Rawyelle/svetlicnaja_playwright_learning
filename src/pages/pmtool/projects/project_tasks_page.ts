import { Locator, Page, expect } from "@playwright/test";
import { LoginPage } from "../login_page.ts";

export class ProjectTasksPage {
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;
  private readonly tasksTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.tasksTitle = page.locator("//h3[@class='page-title']");
  }

  async clickProfile(): Promise<ProjectTasksPage> {
    await this.profileButton.click();
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async appHeaderHasText(pageTitle: string): Promise<ProjectTasksPage> {
    await expect(this.tasksTitle).toHaveText(pageTitle);
    return this;
  }
}
