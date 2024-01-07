import { test, expect } from '@playwright/test';

// ISBN of the publication to be searched
const ISBN = "9781118577431";

// Selector for the search result text element
const SEARCH_RESULT_TEXT = '.result__suffix';

// Test case: Access and Download a Free Publication
test('Access and Download a Free Publication', async ({ page }) => {

  // Step 1: Navigate to the website
  await page.goto('https://onlinelibrary.wiley.com/');

  // Step 2: Search for the publication using ISBN
  await page.click('id=searchField1');
  await page.locator('id=searchField1').fill(ISBN);
  await page.click('.quick-search__button');

  // Step 3: Wait for the search result to appear
  const resultElement = await page.waitForSelector(SEARCH_RESULT_TEXT);

  // Step 4: Get the text content of the search result and assert it against ISBN
  const actualResult = await resultElement.innerText();
  await expect(actualResult).toContain(ISBN);

  // Step 5: Click on the publication link by heading name
  await page.getByRole('heading', { name: 'Computer Architecture' }).getByRole('link').click();

  // Step 6: Assert that the page title matches the expected title
  await expect(page).toHaveTitle("Computer Architecture | Wiley Online Books");

  // Step 7: Click on the first PDF link
  await page.locator('.PdfLink > a').first().click();

  // Step 8: Click on the download button
  await page.locator('.navbar-download').click();
});
