import { expect, test } from "../Fixtures/fixture";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import * as testData from './testData/testData.json';

let page;
let loginPage: LoginPage;
let productPage: ProductPage;
test.describe('suite 1', () => {                
    test.beforeEach(async ({ browser }) => {
    // Initialize page objects
   page = await browser.newPage();
   loginPage = new LoginPage(page);
   productPage = new ProductPage(page);    
});
    test.afterEach(async ({ page }) => {
    // Code to run after each test
    //page.close();
    console.log('Test completed');
});

test('E2E', async ({ page ,loginPage , productPage}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername(testData.username);
    await loginPage.enterPassword(testData.password);
    await loginPage.takeScreenshot('./tests/screenshots/LoginPage.png');
    await loginPage.clickOnLoginButton();
    await productPage.clickOnAddToCartBtn();
    await productPage.takeScreenshot('./tests/screenshots/ProductPage.png');
    await productPage.clickOnCartBtn();
    await productPage.takeScreenshot('./tests/screenshots/cartPage.png');
    page.close();
});
   
});

test('outside suite @sanity', async ({ page }) => {
    console.log('This is an outside suite sanity test');

});  
test('outside suite @smoke', async ({ page }) => {
    console.log('This is an outside suite smoke test');

}); 
test('outside suite2 @smoke', async ({ page }) => {
    console.log('This is an outside suite smoke test again');

}); 