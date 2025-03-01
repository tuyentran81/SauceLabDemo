import { test } from "../pages/fixtures/test-fixture";
import { expect } from '@playwright/test';

test.describe('Login Page', () => {
    test("Verify the standard user is able to login successfully",
        { tag: ["@login", "@Demo1"] },
        async ({ loginPage, productsPage }) => {
            // Action
            await test.step("Login with standard user", async () => {
                await loginPage.login();
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
            });
            // Assert
            await test.step("Verify the user is navigated to the Products page", async () => {
                await expect.soft(productsPage.lblPageTitle).toHaveText('Products');
            });
        });

    test("Verify the user logins unsuccessfully with invalid user and invalid password",
        { tag: ["@login", "@Demo2"] },
        async ({ loginPage }) => {
            // Arrange
            const invalidUser = "invalidUser";
            const invalidPassword = "invalidPassword";
            const errorMsg = 'Epic sadface: Username and password do not match any user in this service';

            // Action
            await test.step("Login with standard user", async () => {
                await loginPage.login(invalidUser, invalidPassword);
            });

            // Assert
            await test.step("Verify the error message is displayed", async () => {
                await expect.soft(loginPage.lblErrorMsg).toBeVisible();
                await expect.soft(loginPage.lblErrorMsg).toHaveText(errorMsg);
            });
        });
});