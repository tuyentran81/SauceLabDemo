import BasePage from "../../pages/basePage";
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
        const regName = `${productName}`.replace(/ /g, '-').toLowerCase();       
        const btnAddToCart = this.page.getByTestId(`add-to-cart-${regName}`);
        await btnAddToCart.click();
    }

    async removeProductFromCart(productName: string) {
        const regName = `${productName}`.replace(/ /g, '-').toLowerCase();        
        const btnRemove = this.page.getByTestId(`remove-${regName}`);
        await btnRemove.click();
    }

    async verifyRemoveButton(productName: string) {
        const regName = `${productName}`.replace(/ /g, '-').toLowerCase();        
        const btnRemove = this.page.getByTestId(`remove-${regName}`);
        await (expect.soft(btnRemove).toBeVisible());
    }

    async verifyAddToCartButton(productName: string) {
        const regName = `${productName}`.replace(/ /g, '-').toLowerCase();
        const btnAddToCart = this.page.getByTestId(`add-to-cart-${regName}`);
        await (expect.soft(btnAddToCart).toBeVisible());
    }

}

export default ProductsPage;