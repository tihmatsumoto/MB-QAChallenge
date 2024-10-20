# MB.io QA Challenge

This repository contains the solution for the challenge provided by Mercedes-Benz.io for task 1, 2 and 3 of the QA Engineer challenge.

## Task 1

Task 1 is available as a PDF file named: Task 1 - Manual Testing.pdf. It contains all bugs identified for two scenarios provided.

## Task 2

Task 2 is available as a folder with all code for Automated Testing task using **Playwright** framework, **Typescript** and **Page Object Model (POM)**.

I decided to use POM to better organize and maintainance test scripts, which is something that needs to be considered for a growing framework and its tests. These decision improves separation of concerns, allowing us to maintain logic and interactions specific to some pages. If there are any UI changes, we only have to update locator in order to resolve flakiness from changes.

Right away, there are some improvements that we can do, thinking about extending reusability of some functions. For example, I decided to implement `selectPrivatePurpose`, but it could be improved to be used to both Private and Business purpose with simple changes, like passing purpose parameter and usage of switch case/if-else statement. 

Another example is how both `selectSorting` and `verifyErrorMessage` could be moved out of their specific pages to another broader - common-page, if their locators are same as other pages. It would improve DRY for project.

Folder is structured to have 4 pages (HomePage, SelectLocationFrame, ExploreVehiclesPage, ContactFormFrame), and a single test that:

- sets location;
- selects preowned filter, and color;
- clicks most expensive vehicle;
- saves info to json file;
- verify error message for email;

I also decided to have data in a separate file, which can easily be changed in case, team wants to verify multiple behaviors using a single test, using a forEach loop, for example. 

**Note:** Choose firefox and webkit to run on browser. It seems like Chrome isn't asking for cookies twice, like Firefox and Safari. I didn't had time to verify specifically why, just decided to avoid Chromium because of time constrainst.

### Installation

If not available, install **npm**:
```
npm install npm@latest -g
```
Clone this repository:
```
git clone https://github.com/tihmatsumoto/MB-QAChallenge
```
Install dependencies and project:
```
npm install
```
### Running tests

To run tests, go to `Task-2` folder:
```
cd Task-2
```

* For **firefox** based browser
```
  npm run test:firefox
```
* For **webkit** based browser
```
  npm run test:safari
```

## Task 3
This task is available in .github/workflows/negative-path-tests.yml. Tried to keep it simple, and straightforward. 
If one improvement could be done, would be to have it be setup as a link, so user can click and be redirected to the report in github pages or something around that behavior to make it easier to see final results
