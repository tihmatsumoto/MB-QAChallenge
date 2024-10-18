import { expect, Locator, Page } from "@playwright/test"

export class HomePage {
  readonly page: Page
  readonly agreeToAllButton: Locator;


  constructor(page: Page) {
    this.page = page
    this.agreeToAllButton = page.getByRole('button', {name: 'Agree to all'})
  }

  async visit() {
    await this.page.goto('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo')
  }

  async acceptCookies() {
    await this.agreeToAllButton.click()
    await expect(this.agreeToAllButton).not.toBeVisible()
  }
}