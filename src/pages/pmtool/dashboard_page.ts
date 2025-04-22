import { expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";
import { ProjectsPage } from "./projects_page.ts";

export class DashboardPage {
  //identifikace prvku a dalsich properties
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;
  private readonly projectsButton: Locator;
  private readonly pageNavBar: Locator;
  //constructor v kterem nastavime jednotlive lokatory
  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.projectsButton = page.locator("#Projects a");
    this.pageNavBar = page.locator(".navbar-brand");
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

  async clickProjects(): Promise<ProjectsPage> {
    await this.projectsButton.click();
    return new ProjectsPage(this.page);
  }

  async profileButtonIsVisible(): Promise<DashboardPage> {
    await expect(this.profileButton).toBeVisible();
    return this;
  }

  async appHeaderHasText(appName: string): Promise<DashboardPage> {
    await expect(this.pageNavBar).toHaveText(appName);
    return this;
  }
}
