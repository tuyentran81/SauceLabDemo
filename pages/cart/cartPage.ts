import BasePage from "../../pages/basePage";
import { Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';

class CartPage extends BasePage {

    readonly btnCheckout: Locator;
    readonly btnContinueShopping: Locator;


    constructor(options: { page: Page }) {
        super(options);
        this.btnCheckout = this.page.getByTestId("checkout");
        this.btnContinueShopping = this.page.getByTestId("continue-shopping");
    }

    async getProductQuantity(productName: string): Promise<number> {
        const lblQuantity = this.page.locator(`div.cart_item:has-text("${productName}") .cart_quantity`);
        return parseInt((await lblQuantity.textContent()) ?? '0');
    }

    async getProductName(productName: string): Promise<string> {
        const productLocator = this.page.getByTestId("inventory-item-name").filter({ hasText: `${productName}` });
        return (await productLocator.textContent()) ?? "";
    }


    async verifyProductQuantity(productName: string, quantity: number) {
        const actualQuantity = await this.getProductQuantity(productName);
        const actualProductName = await this.getProductName(productName);

        expect.soft(actualProductName).toBe(productName);
        expect.soft(actualQuantity).toBe(quantity);
    }

    async verifyCartIconDisabled() {
        await expect(this.btnCheckout).toBeDisabled();
    }

    async removeProduct(productName: string) {
        const regName = `${productName}`.replace(/ /g, '-').toLowerCase();
        const btnRemove = this.page.getByTestId(`remove-${regName}`);
        await btnRemove.click();
    }

    async clickCheckout() {
        await this.btnCheckout.click();
    }

    async clickContinueShopping() {
        await this.btnContinueShopping.click();
    }
}

export default CartPage;