import BasePage from "./basepage";
import { Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';

class ProductDetailPage extends BasePage {

    readonly lnkBackToProduct: Locator;
    readonly btnAddToCart: Locator;
    readonly lblProductTitle: Locator;
    readonly lblProductDescription: Locator;
    readonly imgProductImage: Locator;
    readonly btnRemove: Locator;

    constructor(options: { page: Page }) {
        super(options);
        this.lnkBackToProduct = this.page.getByTestId("back-to-products");
        this.btnAddToCart = this.page.getByTestId("add-to-cart");
        this.lblProductTitle = this.page.getByTestId("inventory-item-name");
        this.lblProductDescription = this.page.getByTestId("inventory-item-desc");
        this.imgProductImage = this.page.getByTestId("item-sauce-labs-backpack-img");
        this.btnRemove = this.page.getByTestId("remove");
    }

    async verifyProductDetailsOverview(title: string, description: string) {
        await (expect.soft(this.lblProductTitle).toBeVisible());
        await (expect.soft(this.lblProductTitle).toHaveText(title));
        await (expect.soft(this.lblProductDescription).toBeVisible());
        await (expect.soft(this.lblProductDescription).toHaveText(description));
        await (expect.soft(this.imgProductImage).toBeVisible());
    }

    async addProductToCart() {
        await this.btnAddToCart.click();
    }

    async removeProductFromCart() {
        await this.btnRemove.click();
    }
}

export default ProductDetailPage;