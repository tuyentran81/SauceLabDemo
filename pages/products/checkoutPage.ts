import BasePage from "../../pages/basePage";
import { Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';

class CheckoutPage extends BasePage {

    readonly txtFirstName: Locator;
    readonly txtLastName: Locator;
    readonly txtZipCode: Locator;
    readonly btnContinue: Locator;
    readonly btnCancel: Locator;
    readonly lblTitle: Locator;
    readonly btnFinish: Locator;
    readonly lblPaymentInfo: Locator;
    readonly lblShippingInfo: Locator;
    readonly lblSubTotal: Locator;
    readonly lblTotal: Locator;
    readonly lblCompleteHeader: Locator;
    readonly lblCompleteText: Locator;
    readonly btnBackHome: Locator;

    constructor(options: { page: Page }) {
        super(options);
        this.txtFirstName = this.page.getByTestId("firstName");
        this.txtLastName = this.page.getByTestId("lastName");
        this.txtZipCode = this.page.getByTestId("postalCode");
        this.btnContinue = this.page.getByTestId("continue");
        this.btnCancel = this.page.getByTestId("cancel");
        this.lblTitle = this.page.getByTestId("title");
        this.btnFinish = this.page.getByTestId("finish");
        this.lblPaymentInfo = this.page.getByTestId("payment-info-value");
        this.lblShippingInfo = this.page.getByTestId("shipping-info-value");
        this.lblSubTotal = this.page.getByTestId("subtotal-label");
        this.lblTotal = this.page.getByTestId("total-label");
        this.lblCompleteHeader = this.page.getByTestId("complete-header");
        this.lblCompleteText = this.page.getByTestId("complete-text");
        this.btnBackHome = this.page.getByTestId("back-to-products");
    }

    async fillUserInfo(firstName: string, lastName: string, zipCode: string) {
        await this.txtFirstName.fill(firstName);
        await this.txtLastName.fill(lastName);
        await this.txtZipCode.fill(zipCode);
    }

    async clickContinue() {
        await this.btnContinue.click();
    }

    async verifyCheckoutYourInfo() {
        await expect(this.lblTitle).toHaveText("Checkout: Your Information");
        await expect(this.txtFirstName).toBeVisible();
        await expect(this.txtLastName).toBeVisible();
        await expect(this.txtZipCode).toBeVisible();
    }

    async verifyCheckoutOverview() {
        await expect(this.lblTitle).toHaveText("Checkout: Overview");
        await expect(this.lblPaymentInfo).toBeVisible();
        await expect(this.lblShippingInfo).toBeVisible();
        await expect(this.lblSubTotal).toBeVisible();
        await expect(this.lblTotal).toBeVisible();
    }

    async verifyCheckoutComplete(header: string, message: string) {
        await expect(this.lblTitle).toHaveText("Checkout: Complete!");
        await expect(this.lblCompleteHeader).toHaveText(header);
        await expect(this.lblCompleteText).toHaveText(message);
    }
}

export default CheckoutPage;