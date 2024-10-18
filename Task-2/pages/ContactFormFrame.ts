import { expect, Locator, Page } from "@playwright/test"

export class ContactFormFrame {
  readonly page: Page;
  readonly firstNameField: Locator
  readonly lastNameField: Locator
  readonly zipCodeField: Locator
  readonly mobilePhoneField: Locator
  readonly emailField: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameField = page.locator('input[name="firstname"]').last()
    this.lastNameField = page.locator('input[name="lastname"]').last()
    this.zipCodeField = page.locator('input[name="zipCode"]').last()
    this.mobilePhoneField = page.locator('input[name="mobilePhone"]').last()
    this.emailField = page.locator('input[name="email"]').last()
    this.submitButton = page.locator('.form-formstep-cta__button').getByText('Submit')
    this.errorMessage = page.locator('.wb-control-error')
  }

  async fillForm(firstName: string, lastName: string, postalCode: string, mobilePhone: string, email: string) {
    await this.firstNameField.fill(firstName)
    await this.lastNameField.fill(lastName)
    await this.zipCodeField.fill(postalCode)
    await this.mobilePhoneField.fill(mobilePhone)
    await this.emailField.fill(email)
  }

  async sendForm() {
    await this.submitButton.click()
  }

  async verifyErrorMessage(message: string) {
    const errorMessage = await this.errorMessage.textContent()
    expect(errorMessage).toContain(message)
  }
}