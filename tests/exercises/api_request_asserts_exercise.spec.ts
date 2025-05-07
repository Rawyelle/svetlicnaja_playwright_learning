import { test, expect } from "@playwright/test";

test("Response Body Asserts", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );
  // ? Vytažení body z response
  const responseBody = await response.json();

  // * Kontroly
  // ? Kontroly obsahu
  expect(responseBody.username).toBe("petrfifka");

  // ? Kontrola existence property
  expect(responseBody).toHaveProperty("userId");

  // ? Kontrola typu property (number, string, boolean)
  expect(typeof responseBody.active).toBe("number");
});
