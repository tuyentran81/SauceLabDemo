import { test } from "../pages/fixtures/test-fixture";
import { expect } from '@playwright/test';

test.describe('Products Page', () => {
    test("Verify the user is able to view his cart",
        { tag: ["@cart", "@Demo6"] },
        async ({ loginPage, productsPage, header, cartPage }) => {
            const product1 = "Sauce Labs Backpack";
            const product2 = "Sauce Labs Bolt T-Shirt";

            // Arrange
            await test.step("Pre-condition: Login with standard user", async () => {
                await loginPage.login();
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
            });

            await test.step("Step 1: Select any product and click on Add to cart button", async () => {
                await productsPage.addProductToCart(product1);
            });

            await test.step("Step 2: Select another product and click on Add to cart button", async () => {
                await productsPage.addProductToCart(product2);
            });

            // Action + Assert
            await test.step("Step 1: Click on the cart icon", async () => {
                await header.clickCartIcon();
            });

            await test.step("The Your Cart page is displayed with product list and their quantity is to 1", async () => {
                await cartPage.verifyProductQuantity(product1, 1);
                await cartPage.verifyProductQuantity(product2, 1);
            });

            await test.step("Verify there is a Checkout button", async () => {
                await (expect(cartPage.btnCheckout).toBeVisible());
            });

            await test.step("Verify There is a Continue Shopping", async () => {
                await (expect(cartPage.btnContinueShopping).toBeVisible());
            });
        });

    test("Verify the cart icon should be disabled in case of no product",
        { tag: ["@cart", "@Demo10"] },
        async ({ loginPage, productsPage, header, cartPage }) => {            
            // Arrange
            await test.step("Pre-condition: Login with standard user", async () => {
                await loginPage.login();
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
            });

            // Action
            await test.step("Step 1: Click on the cart icon", async () => {
                await header.clickCartIcon();
            });

            // Assert
            // Bug001: The cart icon should be disabled in case of no product
            await test.step("Verify The cart icon should be disabled", async () => {
                await cartPage.verifyCartIconDisabled();
            });
        });

    test("Verify the user is able to remove product out of his cart",
        { tag: ["@cart", "@Demo9"] },
        async ({ loginPage, productsPage, header, cartPage }) => {
            const product1 = "Sauce Labs Backpack";
            const product2 = "Sauce Labs Bolt T-Shirt";

            // Arrange
            await test.step("Pre-condition: Login with standard user", async () => {
                await loginPage.login();
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
            });

            await test.step("Step 1: Select any product and click on Add to cart button", async () => {
                await productsPage.addProductToCart(product1);
            });

            await test.step("Step 2: Select another product and click on Add to cart button", async () => {
                await productsPage.addProductToCart(product2);
            });

            // Action + Assert
            await test.step("Step 1: Click on the cart icon", async () => {
                await header.clickCartIcon();
            });

            await test.step("The Your Cart page is displayed with product list and their quantity is to 1", async () => {
                await cartPage.verifyProductQuantity(product1, 1);
                await cartPage.verifyProductQuantity(product2, 1);
            });

            await test.step("Verify there is a Checkout button", async () => {
                await (expect(cartPage.btnCheckout).toBeVisible());
            });

            await test.step("Verify There is a Continue Shopping", async () => {
                await (expect(cartPage.btnContinueShopping).toBeVisible());
            });

            await test.step("Step 2: Click on Remove button for the product", async () => {
                await cartPage.removeProduct(product1);
            });

            await test.step("Verify the product is removed from the cart", async () => {
                await header.verifyCartBadgeCount(1);
            });
        });
});