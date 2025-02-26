import { test } from "../pages/fixtures/test-fixture";
import { expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('Verify the standard user is able to login successfully',
    { tag: ["@login","@Demo1"] },
    async ({ loginPage, productsPage }) => {
        await loginPage.login();
        await productsPage.lblPageTitle.waitFor({ state: 'visible' });
        await expect(productsPage.lblPageTitle).toHaveText('Products');
    });

    test('Verify the user logins unsuccessfully',
        { tag: ["@login","@Demo2"] },
        async ({ loginPage }) => {
            const invalidUser = "invalidUser";
            const invalidPassword = "invalidPassword";
            const errorMsg = 'Epic sadface: Username and password do not match any user in this service';
            await loginPage.login(invalidUser, invalidPassword);
            await expect(loginPage.lblErrorMsg).toBeVisible();
            await expect(loginPage.lblErrorMsg).toHaveText(errorMsg);          
        });
});