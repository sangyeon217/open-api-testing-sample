export class AppAccessAgreePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.agreeCheckBox = page.locator("#agree_select");
    this.submitBtn = page.locator(".btn.agree");
  }
}
