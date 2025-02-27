import BasePage from "./basepage";
import { Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';

class ProductsPage extends BasePage {

    readonly lblPageTitle: Locator;


    constructor(options: { page: Page }) {
        super(options);
        this.lblPageTitle = this.page.locator("span[data-test='title']");
    }

    async viewProductDetails(productName: string) {
        const productLink = this.page.getByTestId("inventory-item-name").filter({ hasText: `${productName}` });
        await productLink.click();
    }

    async addProductToCart(productName: string) {
        const productLink = this.page.getByTestId("inventory_item").filter({ hasText: `${productName}` });
        const btnAddToCart = productLink.filter({ has: this.page.getByRole("button", {name: /add-to-cart/})});
        await btnAddToCart.click();
    }

    async removeProductFromCart(productName: string) {
        const productLink = this.page.getByTestId("inventory_item").filter({ hasText: `${productName}` });
        const btnRemove = productLink.filter({ has: this.page.getByRole("button", {name: /remove/})});
        await btnRemove.click();
    }

    async verifyRemoveButton(productName: string) {
        const productLink = this.page.getByTestId("inventory_item").filter({ hasText: `${productName}` });
        const btnRemove = productLink.filter({ has: this.page.getByRole("button", {name: /remove/})});
        await (expect(btnRemove).toBeVisible());
    }

    async verifyAddToCartButton(productName: string) {
        const productLink = this.page.getByTestId("inventory_item").filter({ hasText: `${productName}` });
        const btnAddToCart = productLink.filter({ has: this.page.getByRole("button", {name: /add-to-cart/})});
        await (expect(btnAddToCart).toBeVisible());
    }

}

export default ProductsPage;