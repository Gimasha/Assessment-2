import { test, expect } from '@playwright/test';

// ISBN of the publication to be searched
const ISBN = "9781118577431";

// Selector for the search result text element
const SEARCH_RESULT_TEXT = '.result__suffix';

// Test case: Search for a Publication
test('Search for a Publication', async ({ page }) => {

  // Step 1: Navigate to the website
  await page.goto('https://onlinelibrary.wiley.com/');

  // Step 2: Click on the search bar and type the ISBN
  await page.click('id=searchField1');
  await page.locator('id=searchField1').fill(ISBN);

  // Step 3: Click the search button
  await page.click('.quick-search__button');

  // Step 4: Wait for the search result to appear
  const resultElement = await page.waitForSelector(SEARCH_RESULT_TEXT);

  // Step 5: Get the text content of the search result
  const actualResult = await resultElement.innerText();

  // Step 6: Assert that the actual result contains the ISBN
  await expect(actualResult).toContain(`"${ISBN}" anywhere`);
});
