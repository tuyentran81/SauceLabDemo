import BasePage from "../../pages/basePage";
import { Locator, Page } from "@playwright/test";
import Env from "../../settings/env/env.global";

class LoginPage extends BasePage {

    readonly txtUsername: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly lblErrorMsg: Locator;

    constructor(options: { page: Page }) {
        super(options);
        this.txtUsername = this.page.getByTestId("username");
        this.txtPassword = this.page.getByTestId("password");
        this.btnLogin = this.page.getByTestId("login-button");
        this.lblErrorMsg = this.page.getByTestId("error");
    }

    async login(username: string = Env.USERNAME, password: string = Env.PASSWORD) {
        await this.txtUsername.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }
}

export default LoginPage;