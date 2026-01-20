// Assertions
import { test, expect } from '@playwright/test';

test('to be hidden', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
  console.log(await page.url());
  await expect(page.locator('[id="finish"]')).toBeHidden();

});

test('to be present', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/add_remove_elements');
  console.log(await page.url());
  await expect(page.locator('[class="added-manually"]')).not.toHaveCount(1);
  await page.locator('[onclick="addElement()"]').click();
  await expect(page.locator('[class="added-manually"]')).toHaveCount(1);
  
});


test('to be enabled', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  console.log(await page.url());

  await expect(page.locator('//*[@id="input-example"]/input')).toBeDisabled();

  await page.locator('//*[@id="input-example"]/button').click();
  await expect(page.locator('//*[@id="input-example"]/input')).toBeEnabled();
});

test('to have text', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  console.log(await page.url());

  await expect(page.locator('//*[@id="input-example"]/button')).toHaveText('Enable');
  await expect(page.locator('//*[@id="input-example"]/button')).not.toHaveText('Enabled');
  //await page.waitForTimeout(3000);
});

test('to have attribute', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  console.log(await page.url());

  await expect(page.locator('//*[@id="input-example"]/button')).toHaveAttribute('autocomplete','off');
});

test('to have url', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  console.log(await page.url());

  // full url
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/dynamic_controls');
  // partial url 
  await expect(page).toHaveURL(/the-internet.herokuapp/);
});

test('to have title', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  console.log(await page.url());

  // full url
  await expect(page).toHaveTitle('The Internet');
  // partial url 
  await expect(page).toHaveTitle(/.*The Internet/);
});

test('to have Screenshot', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  console.log(await page.url());

  await expect(page).toHaveScreenshot();
});