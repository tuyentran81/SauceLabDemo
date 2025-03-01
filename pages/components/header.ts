import BasePage from "../../pages/basePage";
import { Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';

class Header extends BasePage {

    readonly imgMenu: Locator;
    readonly lnkShoppingCart: Locator;
    readonly lblCartBadge: Locator;
    readonly lblErrorMsg: Locator;

    constructor(options: { page: Page }) {
        super(options);
        this.imgMenu = this.page.getByTestId("open-menu");
        this.lnkShoppingCart = this.page.getByTestId("shopping-cart-link");
        this.lblCartBadge = this.page.getByTestId("shopping-cart-badge");
    }

    async verifyCartBadgeCount(count: number) {
        await (expect.soft(this.lblCartBadge).toHaveText(count.toString()));
    }

    async clickCartIcon() {
        await this.lnkShoppingCart.click();
    }
}

export default Header;