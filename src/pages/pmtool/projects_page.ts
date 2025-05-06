import { expect, Locator, Page } from "@playwright/test";
import { CreateNewProjectModal } from "./projects/create_new_project_modal.ts";

export class ProjectsPage {
  private readonly page: Page;
  private readonly addProjectButton: Locator;
  private readonly projectsListDiv: Locator;
  private readonly projectsTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addProjectButton = page.locator('//button[@test_id="Add Project"]');
    this.projectsListDiv = page.locator("#slimScroll");
    this.projectsTitle = page.locator("//h3[@class='page-title']");
  }

  async clickAddProject(): Promise<CreateNewProjectModal> {
    await expect(this.projectsListDiv).toBeVisible();
    await this.addProjectButton.click();
    return new CreateNewProjectModal(this.page);
  }

  async appHeaderHasText(pageTitle: string): Promise<ProjectsPage> {
    await expect(this.projectsTitle).toHaveText(pageTitle);
    return this;
  }
}
