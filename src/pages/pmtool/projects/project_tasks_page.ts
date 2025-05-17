import { Locator, Page, expect } from "@playwright/test";
import { LoginPage } from "../login_page.ts";
import { ProjectInfoPage } from "./projects_info_page.ts";

export class ProjectTasksPage {
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;
  private readonly tasksTitle: Locator;
  private readonly projectInfoButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.tasksTitle = page.locator("//h3[@class='page-title']");
    this.projectInfoButton = page.locator(".navbar-header a.navbar-brand");
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

  async clickProjectInfo(): Promise<ProjectInfoPage> {
    await this.projectInfoButton.click();
    return new ProjectInfoPage(this.page);
  }
}
