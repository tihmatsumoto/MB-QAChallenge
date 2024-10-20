import { test } from '@playwright/test';

import { HomePage } from '../pages/HomePage'
import { SelectLocationFrame } from '../pages/SelectLocationFrame';
import { ExploreVehiclesPage } from '../pages/ExploreVehiclesPage'
import { ContactFormFrame } from '../pages/ContactFormFrame';

import { data } from '../data/enquire-now-data.json';

test.describe('Enquire Now Flow - Negative test case', () => {  

  let homePage: HomePage
  let selectLocationFrame: SelectLocationFrame
  let exploreVehiclesPage: ExploreVehiclesPage
  let contactFormFrame: ContactFormFrame

  test('Should verify invalid email data in Enquire Now flow', async ({ page }) => {
    homePage = new HomePage(page)
    selectLocationFrame = new SelectLocationFrame(page)
    exploreVehiclesPage = new ExploreVehiclesPage(page)
    contactFormFrame = new ContactFormFrame(page)

    //Visit url
    await homePage.visit()
    await homePage.acceptCookies()
    //Select location and purpose
    await selectLocationFrame.selectLocation(data.state, data.postalCode)
    await selectLocationFrame.selectPrivatePurpose()
    await selectLocationFrame.continueToSelectedLocation()
    //Select PreOwned vehicle from filter widget
    await exploreVehiclesPage.selectPreOwnedTab()
    //This redirect requires cookies to be accepted again
    await homePage.acceptCookies()
    //Select vehicle color filter
    await exploreVehiclesPage.selectGreenColorFilter()
    //Sort by price, so we can click Most Expensive Vehicle
    await exploreVehiclesPage.selectSorting(data.sortingType)
    await exploreVehiclesPage.selectMostExpensiveVehicle()
    //Save vehicle data to JSON (Vin number and Model Year)
    await exploreVehiclesPage.saveVehicleDetailsDataToJson()
    //Open contact form to verify email error message
    await exploreVehiclesPage.goToContactForm()
    await contactFormFrame.fillForm(data.firstName, data.lastName, data.postalCode, data.mobilePhone, data.incorrectEmail)
    await contactFormFrame.sendForm()
    //Verify if whether message is available, and if it matches expected result
    await contactFormFrame.verifyErrorMessage(data.emailErrorMessage)
  });
});