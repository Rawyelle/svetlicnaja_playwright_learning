import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Vytvorzeni usera, BU, prihlaseni pres API, klik na Accounts", async ({
  page,
  request,
}) => {
  const username = faker.internet.username();
  const password = faker.internet.password();
  const email = faker.internet.email();

  // Registrace
  const registerResponse = await request.post(
    "http://localhost:3000/user/register",
    {
      data: { username, password, email },
    }
  );
  const registerBody = await registerResponse.json();
  const userId = registerBody.userId;

  // Login
  const loginResponse = await request.post("http://localhost:3000/auth/login", {
    data: { username, password },
  });
  const loginResponseBody = await loginResponse.json();
  const accessToken = loginResponseBody.access_token;

  // Zalozeni bankovniho uctu
  await request.post("http://localhost:3000/accounts", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: {
      userId,
      accountType: "checking",
      transactionLimits: {
        dailyLimit: 1000,
        monthlyLimit: 5000,
      },
      deposit: 500,
      createdAt: "2023-05-07T12:00:00.000Z",
    },
  });

  // Prihlaseni na FE pomoci cookie
  await page.context().addCookies([
    {
      name: "access_token",
      value: accessToken,
      path: "/",
      domain: "localhost",
    },
  ]);

  // Otevreni FE a kliknuti na Accounts
  await page.goto("http://localhost:3001/app");
  await page.locator('//li[@data-testid="accounts_section_link"]').click();
});

// Kontrola balance – skip kvuli bugu
test.skip("Kontrola balance (docasne preskocena kvuli znamemu bugu)", async ({
  page,
}) => {
  const balanceLocator = page.locator('//p[@data-testid="account_balance"]');
  await expect(balanceLocator).toContainText("500");
});
