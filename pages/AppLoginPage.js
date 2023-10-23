import { AuthorizeAPI } from "../apis/login/AuthorizeAPI";

export class AppLoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor({ page, clientId, redirectURI, state }) {
    this.page = page;
    this.clientId = clientId;
    this.redirectURI = redirectURI;
    this.state = state;

    this.userIdInputField = page.locator("#id");
    this.userPwInputField = page.locator("#pw");
    this.loginBtn = page.locator(".btn_login");
  }

  async goto() {
    await this.page.goto(
      new AuthorizeAPI({
        clientId: this.clientId,
        redirectURI: this.redirectURI,
        state: this.state,
      }).url
    );
  }

  async login(userId, userPw) {
    await this.userIdInputField.fill(userId);
    await this.userPwInputField.fill(userPw);
    await this.loginBtn.click();
  }
}
