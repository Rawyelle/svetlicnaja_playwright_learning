import { test } from "@playwright/test";
import { DefaultScreenPage } from "../../src/pages/tredgate-eshop/defaultScreen_page.ts";
import { RegisterPage } from "../../src/pages/tredgate-eshop/register_page.ts";

test("Test Page objects", async ({ page }) => {
  const defaultPage = new DefaultScreenPage(page);
  const registerPage = new RegisterPage(page);
  await defaultPage.openEshop();
  await defaultPage.clickAccount();
  await defaultPage.clickRegister();

  await registerPage.fillFirstName("Olga");
  await registerPage.fillLastName("S");
  await registerPage.fillEmail("olga@example.com");
  await registerPage.fillTelephone("777876876");
  await registerPage.fillPassword("Heslo123");
  await registerPage.fillConfirmPassword("Heslo123");
  await registerPage.clickcontinueButton();
});
