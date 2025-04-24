import { test } from "@playwright/test";
import path from "path";

test.describe("Forms Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
  });

  test("fill a pressSequentially Test", async ({ page }) => {
    await page.locator("#name").fill("Start");
    await page.locator("#name").fill("End");
    await page.locator("#name").pressSequentially("Kde toto bude?");
    await page.locator("#name").pressSequentially("ABCD", { delay: 1500 }); // ? Odezva mezi jednotlivými znaky je 1500 ms (1.5 s)
  });

  test("Select Test", async ({ page }) => {
    // ? Vybírá option z select pomocí atributu value
    await page.locator("#gender").selectOption("female");
    // ? Vybírá option ze selectu pomocí textu
    await page.locator("#gender").selectOption({ label: "Male" });
  });

  test("Checkbox, Radio Button Test", async ({ page }) => {
    // ? Vybrání radio
    await page.locator("#contact-phone").check();
    // ? Zakliknutí checkboxu
    await page.locator("#interests-sports").check();
    // ? Odkliknutí (pouze checkbox)
    await page.locator("#interests-sports").uncheck();
  });

  test("Date Fill Test", async ({ page }) => {
    await page.locator("#date-of-birth").fill("2000-05-24");
  });

  test("File Upload Test", async ({ page }) => {
    const filePath = path.resolve(
      __dirname,
      "../../../src/assets/upload_file.txt"
    );

    // ? Zapneme čekání na event filechooser (bez await)
    const fileChooserPromise = page.waitForEvent("filechooser");
    // ? Klikneme na upload input
    await page.locator("#file-upload").click();
    // ? Odchytíme okno s výběrem souboru
    const fileChooser = await fileChooserPromise;
    // ? Vybereme soubor přes fileChooser
    fileChooser.setFiles(filePath);

    // ? čekání 2 sec. abychom viděli výsledek v testu
    await page.waitForTimeout(2000);
  });
});
