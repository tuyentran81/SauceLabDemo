import { test } from "../pages/fixtures/test-fixture";
import { expect } from '@playwright/test';

test.describe('Products Page', () => {
    test('Verify the user is able to view the product detail',
        { tag: ["@products", "@Demo4"] },
        async ({ loginPage, productsPage, productDetailPage }) => {
            const productName = "Sauce Labs Backpack";
            const productDescription = "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.";

            // Arrange
            await test.step("Pre-condition: Login with standard user", async () => {
                await loginPage.login();
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
            });

            // Action
            await test.step("Step 1: Click on any product", async () => {
                await productsPage.viewProductDetails(productName);
            });

            // Assert
            await test.step("Step 1a: Verify the Product Details page is loaded with the image, product description", async () => {
                await productDetailPage.verifyProductDetailsOverview(productName, productDescription);
            });

            await test.step("Step 1b: Verify the Add to cart button is displayed", async () => {
                await (expect(productDetailPage.btnAddToCart).toBeVisible());
            });

            await test.step("Step 1c: Verify the link Back to products is shown", async () => {
                await (expect(productDetailPage.lnkBackToProduct).toBeVisible());
            });

        });

    test('Verify the user is able to add or remove the product from the Product Detail page',
        { tag: ["@products", "@Demo5"] },
        async ({ loginPage, productsPage, productDetailPage, header }) => {
            const productName = "Sauce Labs Backpack";
            const productDescription = "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.";
            const productNo = 1;

            // Arrange
            await test.step("Pre-condition: Login with standard user", async () => {
                await loginPage.login();
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
            });

            // Action + Assert
            await test.step("Step 1: Click on any product", async () => {
                await productsPage.viewProductDetails(productName);
            });

            await test.step("Verify the Product Details page is loaded with the image, product description", async () => {
                await productDetailPage.verifyProductDetailsOverview(productName, productDescription);
            });

            await test.step("Step 2: Click on Add to cart button", async () => {
                await productDetailPage.addProductToCart();
            });

            await test.step("Verify the cart shows number 1", async () => {
                await header.verifyCartBadgeCount(productNo);
            });

            await test.step("The Add to cart button changes to Remove", async () => {
                await (expect(productDetailPage.btnRemove).toBeVisible());
            });

            await test.step("Step 3: Click on Remove button", async () => {
                await productDetailPage.removeProductFromCart();
            });

            await test.step("Verify the number of products disappeared", async () => {
                await (expect(header.lblCartBadge).toBeHidden());
            });

            await test.step("The Remove button is changed to Add to cart button", async () => {
                await (expect(productDetailPage.btnAddToCart).toBeVisible());
            });
        });

    test('Verify the user is able to add and remove one or more products from Product page',
        { tag: ["@products", "@Demo3"] },
        async ({ loginPage, productsPage, header }) => {
            const product1 = "Sauce Labs Backpack";
            const product2 = "Sauce Labs Bolt T-Shirt";
            const productNo = 1;

            // Arrange
            await test.step("Pre-condition: Login with standard user", async () => {
                await loginPage.login();
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
            });

            // Action + Assert
            await test.step("Step 1: Select any product and click on Add to cart button", async () => {
                await productsPage.addProductToCart(product1);
            });

            await test.step("Verify the cart shows number 1", async () => {
                await header.verifyCartBadgeCount(productNo);
            });

            await test.step("The Add to cart button changes to Remove", async () => {
                await productsPage.verifyRemoveButton(product1);
            });

            await test.step("Step 2: Select another product and click on Add to cart button", async () => {
                await productsPage.addProductToCart(product2);
            });

            await test.step("Verify the cart shows number 2", async () => {
                await header.verifyCartBadgeCount(productNo + 1);
            });

            await test.step("The Add to cart button changes to Remove", async () => {
                await productsPage.verifyRemoveButton(product2);
            });

            // Remove product 1
            await test.step("Step 3: Remove the first product", async () => {
                await productsPage.removeProductFromCart(product1);
            });

            await test.step("Verify the number of products is decreased", async () => {
                await header.verifyCartBadgeCount(productNo);
            });

            await test.step("The Remove button is changed to Add to cart button", async () => {
                await productsPage.verifyAddToCartButton(product1);
            });

            // Remove product 2
            await test.step("Step 4: Remove the second product", async () => {
                await productsPage.removeProductFromCart(product2);
            });

            await test.step("Verify the number of products disappeared", async () => {
                await (expect(header.lblCartBadge).toBeHidden());
            });

            await test.step("The Remove button is changed to Add to cart button", async () => {
                await productsPage.verifyAddToCartButton(product2);
            });
        });
});