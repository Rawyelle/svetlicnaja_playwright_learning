import { expect, test } from "@playwright/test";

test.describe("Mouse Actions Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
  });

  test("Hover Test", async ({ page }) => {
    await page.locator("#hover-box").hover();
    await expect(page.locator('[data-testid="hover-message"]')).toBeVisible();
  });

  test("Drag and Drop", async ({ page }) => {
    const source = page.locator("#drag1");
    const target = page.locator("#drop1");

    // ? Zascrolluje na cíl kam budeme přetahovat. Pro úspěšné přetáhnutí musí být oba prvky se kterými interagujeme vidět.
    await target.scrollIntoViewIfNeeded();

    await source.dragTo(target);
    await expect(page.locator("#dropped-message")).toBeVisible();
  });

  test("Drag and Drop - alternative if dragTo does not work", async ({
    page,
  }) => {
    const draggable = page.locator("#drag1");
    const dropzone = page.locator("#drop1");

    await dropzone.scrollIntoViewIfNeeded();

    // ? Vytažení souřadnic prvků draggable a dropzone
    const draggableBox = await draggable.boundingBox();
    const dropzoneBox = await dropzone.boundingBox();

    if (!draggableBox || !dropzoneBox) {
      throw new Error(
        "Unable to determine bounding boxes for drag and drop elements"
      );
    }

    // ? přetáhnutí prvku draggable do dropzone pomocí souřadnic. Vypočítává se střed prvků
    await page.mouse.move(
      draggableBox.x + draggableBox.width / 2, // ? draggableBox.x je x souřadnice draggableBox vlevo nahoře. Přičítáme šířku a dělíme dvěma, abychom dostali střed
      draggableBox.y + draggableBox.height / 2 // ? draggableBox.y je y souřadnice draggableBox vlevo nahoře. Přičítáme výšku a dělíme dvěma, abychom dostali střed
    );
    await page.mouse.down();
    await page.mouse.move(
      dropzoneBox.x + dropzoneBox.width / 2,
      dropzoneBox.y + dropzoneBox.height / 2
    );
    await page.mouse.up();
    await expect(page.locator("#dropped-message")).toBeVisible();
  });

  test("Double Click", async ({ page }) => {
    await page.locator('[data-testid="double-click-box"]').dblclick();
    await expect(page.locator('[data-testid="double-click-box"]')).toHaveClass(
      /action-active/
    );
  });

  test("Click and hold", async ({ page }) => {
    await page.locator(".hold-button").click({ delay: 2000 });
  });
});
