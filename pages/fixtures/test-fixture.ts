import { test as base } from "@playwright/test";
import LoginPage from '../loginpage';
import ProductsPage from '../productspage';
import ProductDetailPage from '../productdetailspage';
import Header from '../components/header';
import CartPage from "../cartpage";
import Env from "../../settings/env/env.global";

type AEPages = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    productDetailPage: ProductDetailPage;
    header: Header;
    cartPage: CartPage;
};

export const test = base.extend<AEPages>({
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
    }

});

test.beforeEach(async ({ page }) => {
    await page.goto(Env.BASE_URL);
});