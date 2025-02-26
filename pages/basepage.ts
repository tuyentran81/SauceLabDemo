import { Browser, Page, Locator } from "@playwright/test";

class BasePage {
    protected readonly page: Page;

    constructor(options: { page: Page }) {
        this.page = options.page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }
}

export default BasePage;