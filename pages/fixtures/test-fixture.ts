import { test as base } from "@playwright/test";
import LoginPage from "../../pages/loginPage";
import ProductsPage from "../../pages/productPage";
import ProductDetailPage from '../../pages/produceDetailsPage';
import Header from "../../pages/components/header";
import CartPage from "../../pages/cartPage";
import CheckoutPage from "../../pages/checkoutPage";
import Env from "../../settings/env/env.global";

type SauceLabs = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    productDetailPage: ProductDetailPage;
    header: Header;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

export const test = base.extend<SauceLabs>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage({ page }));
    },
    
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage({ page }));
    },
    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage({ page }));
    },
    header: async ({ page }, use) => {
        await use(new Header({ page }));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage({ page }));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage({ page }));
    },
});

test.beforeEach(async ({ page }) => {
    await page.goto(Env.BASE_URL);
});