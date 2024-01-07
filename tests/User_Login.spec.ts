import { test, expect } from '@playwright/test';

test('Check login functionality with valid email and password', async ({ page }) => {

  // Test data: valid email, password, and expected username
  const EMAIL = "gimashanelumdeniya@gmail.com";
  const PASSWORD ="99@TGS$aa*#";
  const USERNAME= "Gimasha";

  // Step 1: Navigate to the website
  await page.goto('https://onlinelibrary.wiley.com/');

  // Step 2: Click on the sign-in button
  await page.click('.sign-in-label');

  // Step 3: Fill in the email field
  await page.click('id=username');
  await page.locator('id=username').fill(EMAIL);

  // Step 4: Fill in the password field
  await page.click('id=password');
  await page.locator('id=password').fill(PASSWORD);

  // Step 5: Click the 'Log In' button
  await page.getByRole('button', { name: 'Log In' }).click();

  // Step 6: Wait for the profile text to appear
  await page.waitForSelector('.profile-text');

  // Step 7: Verify login by checking if the profile text contains the expected username
  const profileText = await page.$eval('.profile-text', (element) => element.textContent);
  if (profileText.includes(USERNAME)) {
    // Verification passed
    console.log('Profile Text verification passed');
  } else {
    // Verification failed
    console.error('Login failed With the username : ', profileText);
  }
});
