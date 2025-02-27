import { test } from "../pages/fixtures/test-fixture";
import { expect } from '@playwright/test';

test.describe('Login Page', () => {
    test('Verify the standard user is able to login successfully',
        { tag: ["@login", "@Demo1"] },
        async ({ loginPage, productsPage }) => {
            // Step 1: Login with standard user
            await test.step("Step 1: Login with standard user", async () => {
                await loginPage.login();
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
            });

            // Step 2: Verify the user is navigated to the Products page
            await test.step("Step 2: Verify the user is navigated to the Products page", async () => {
                await expect.soft(productsPage.lblPageTitle).toHaveText('Products');
            });
        });

    test('Verify the user logins unsuccessfully',
        { tag: ["@login", "@Demo2"] },
        async ({ loginPage }) => {
            const invalidUser = "invalidUser";
            const invalidPassword = "invalidPassword";
            const errorMsg = 'Epic sadface: Username and password do not match any user in this service';
            // Step 1: Login with invalid user
            await test.step("Step 1: Login with standard user", async () => {
                await loginPage.login(invalidUser, invalidPassword);
            });

            // Step 2: Verify the error message is displayed
            await test.step("Step 2: Verify the error message is displayed", async () => {
                await expect.soft(loginPage.lblErrorMsg).toBeVisible();
                await expect.soft(loginPage.lblErrorMsg).toHaveText(errorMsg);
            });
        });
});