import BasePage from "./basepage";
import { Locator, Page } from "@playwright/test";
import Env from "../settings/env/env.global";

class ProductsPage extends BasePage {

  readonly lblPageTitle: Locator;
  

  constructor(options: { page: Page }) {
    super(options);
    this.lblPageTitle = this.page.locator("span[data-test='title']");
  }

  
}

export default ProductsPage;