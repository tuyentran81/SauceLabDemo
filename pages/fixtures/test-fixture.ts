import { test as base } from "@playwright/test";
import LoginPage from '../loginpage';
import ProductsPage from '../productspage';
import Env from "../../settings/env/env.global";

type AEPages = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    
};

export const test = base.extend<AEPages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage({ page }));
    },
    
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage({ page }));
    },
});

test.beforeEach(async ({ page }) => {
    await page.goto(Env.BASE_URL);
});