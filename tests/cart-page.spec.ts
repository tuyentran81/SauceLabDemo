import { test } from "../pages/fixtures/test-fixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe('Products Page', () => {
    test("Verify the user is able to view his cart",
        { tag: ["@cart", "@Demo6"] },
        async ({ loginPage, productsPage, header, cartPage }) => {
            // Arrange
            const product1 = "Sauce Labs Backpack";
            const product2 = "Sauce Labs Bolt T-Shirt";

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
            // Arrange
            const product1 = "Sauce Labs Backpack";
            const product2 = "Sauce Labs Bolt T-Shirt";

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

    test("Verify the user is able to checkout successfully",
        { tag: ["@cart", "@Demo7"] },
        async ({ loginPage, productsPage, header, cartPage, checkoutPage }) => {
            // Arrange
            const product1 = "Sauce Labs Backpack";
            const product2 = "Sauce Labs Bolt T-Shirt";
            const completeHeader = "Thank you for your order!";
            const completeText = "Your order has been dispatched, and will arrive just as fast as the pony can get there!";
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const zipCode = faker.address.zipCode();

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

            await test.step("Step 2: Click on Checkout button for the product", async () => {
                await cartPage.clickCheckout();
            });

            await test.step("Verify The Checkout page is loaded with FirstName, LastName, Zip Code", async () => {
                await checkoutPage.verifyCheckoutYourInfo();
            });

            await test.step("Verify There has Continue button and Cancel button", async () => {
                await (expect(checkoutPage.btnContinue).toBeVisible());
                await (expect(checkoutPage.btnCancel).toBeVisible());
            });

            await test.step("Step 3:  Input FirstName, LastName, and Zip Code", async () => {               
                await checkoutPage.fillUserInfo(firstName, lastName, zipCode);
            });

            await test.step("Step 4: Click on Continue button", async () => {
                await checkoutPage.clickContinue();
            });

            await test.step("Verify The Checkout Overview page is loaded with Payment Info, Shipping Info, SubTotal, Total", async () => {
                await checkoutPage.verifyCheckoutOverview();
            });

            await test.step("Verify There has Finish button", async () => {
                await (expect(checkoutPage.btnFinish).toBeVisible());
            });

            await test.step("Step 5: Click on Finish button", async () => {
                await checkoutPage.btnFinish.click();
            });

            await test.step("Verify The Checkout Complete page is loaded with the message", async () => {
                await checkoutPage.verifyCheckoutComplete(completeHeader, completeText);
            });

            await test.step("Verify There has Back Home button", async () => {
                await (expect(checkoutPage.btnBackHome).toBeVisible());
            });

            await test.step("Step 6: Click on Back Home button", async () => {
                await checkoutPage.btnBackHome.click();
            });

            await test.step("Verify The Products page is loaded", async () => {
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
                await (expect(productsPage.lblPageTitle).toHaveText("Products"));
            });
        });

    test("Verify the user is able to continue shopping",
        { tag: ["@cart", "@Demo8"] },
        async ({ loginPage, productsPage, header, cartPage, checkoutPage }) => {
            // Arrange
            const product1 = "Sauce Labs Backpack";
            const product2 = "Sauce Labs Bolt T-Shirt";
            const product3 = "Sauce Labs Onesie";

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

            await test.step("Step 2: Click on Continue Shopping button", async () => {
                await cartPage.clickContinueShopping();
            });

            await test.step("Verify The Products page is loaded", async () => {
                await productsPage.lblPageTitle.waitFor({ state: 'visible' });
                await (expect(productsPage.lblPageTitle).toHaveText("Products"));
            });

            await test.step("Step 3: Click on Add to cart button for another product", async () => {
                await productsPage.addProductToCart(product3);
            });

            await test.step("Verify the cart shows number 3", async () => {
                await header.verifyCartBadgeCount(3);
            });

            await test.step("Step 4: Click on the cart icon", async () => {
                await header.clickCartIcon();
            });

            await test.step("The Your Cart page is displayed with product list and their quantity is to 1", async () => {
                await cartPage.verifyProductQuantity(product1, 1);
                await cartPage.verifyProductQuantity(product2, 1);
                await cartPage.verifyProductQuantity(product3, 1);
            });
        });
});