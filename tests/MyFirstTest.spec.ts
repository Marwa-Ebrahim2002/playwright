import{test,expect} from '@playwright/test' ;
test('My First Test ',async({ page }) => {

   await page.goto('https://www.google.com');
   //await page.goto('https://github.com/dashboard'); 
   await expect(page).toHaveTitle('Google');
   //await expect(page).toHaveTitle('Dashboard');

} );

// tomsmith
// SuperSecretPassword!
// onfirst--retry