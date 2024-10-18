import { expect, Locator, Page } from "@playwright/test"
import { writeFileSync } from "fs"

export class ExploreVehiclesPage {
  readonly page: Page
  readonly filterWidget: Locator
  readonly preOwnedTab: Locator
  readonly colorsFilter: Locator
  readonly greenColorFilter: Locator
  readonly sortingFilter: Locator
  readonly vehicleResultGrid: Locator
  readonly vehicleResultTile: Locator 
  readonly vinNumberInfo: Locator
  readonly modelYearInfo: Locator
  readonly speakToAnExpertButton: Locator

  constructor(page: Page) {
    this.page = page
    this.filterWidget = page.locator('.dcp-cars-filter-widget')
    this.preOwnedTab = page.getByRole('button', {name: 'Pre-Owned'})
    this.colorsFilter = page.getByText('Colors')
    this.greenColorFilter = page.getByText('Green').first()
    this.sortingFilter = page.getByLabel('Sorting')
    this.vehicleResultGrid = page.locator('.dcp-cars-srp__results')
    this.vehicleResultTile = page.locator('.wb-vehicle-tile__title').first()
    this.vinNumberInfo = page.getByTestId('dcp-vehicle-details-list-item-code')
    this.modelYearInfo = page.getByTestId('dcp-vehicle-details-list-item-modelYear')
    this.speakToAnExpertButton = page.getByTestId('dcp-cars-buy-box__main-cta-leadform')
  }

  async selectPreOwnedTab() {
    await expect(this.filterWidget).toBeVisible()
    await this.preOwnedTab.click()
  }

  async selectGreenColorFilter() {
    await this.colorsFilter.click()
    await this.greenColorFilter.check()
  }

  async selectSorting(sortingOption: string) {
    await this.sortingFilter.selectOption(sortingOption)
  }

  async selectMostExpensiveVehicle() {
    await expect(this.vehicleResultGrid).toBeVisible()
    await this.vehicleResultTile.click()
  }

  async saveVehicleDetailsDataToJson() {
    const vinNumber = await this.vinNumberInfo.textContent()
    const modelYear = await this.modelYearInfo.textContent()

    writeFileSync('vehicleDetails.json', JSON.stringify({ vinNumber, modelYear }, null, 2));
  }

  async goToContactForm() {
    await this.speakToAnExpertButton.click()
  }
}
