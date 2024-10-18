import { Locator, Page } from "@playwright/test"

export class SelectLocationFrame {
  readonly page: Page;
  readonly selectStateOption: Locator;
  readonly postalCodeField: Locator;
  readonly privateRadioButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page
    this.selectStateOption = page.getByLabel('* Your state')
    this.postalCodeField = page.getByText('* Postal Code')
    this.privateRadioButton = page.getByText('Private').first()
    this.continueButton = page.getByRole('button', { name: 'Continue' })
  }

  async selectLocation(state: string, postalCode: string) {
    await this.selectStateOption.selectOption(state)
    await this.postalCodeField.fill(postalCode)
  }

  async selectPrivatePurpose() {
    await this.privateRadioButton.click()
  }

  async continueToSelectedLocation() {
    await this.continueButton.click()
  }
}