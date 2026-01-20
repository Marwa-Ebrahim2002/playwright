import { test, expect } from '@playwright/test';
import child_process = require('child_process');

test('textbox', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').pressSequentially(
    'SuperSecretPassword!',
    { delay: 200 }
  );

  await Promise.all([
    page.waitForURL(/secure/),
    page.locator('button[type="submit"]').click(),
  ]);

  await expect(page).toHaveURL(/secure/);
});

test('Click', async ({ page }) => {
  await page.goto('https://play1.automationcamp.ir/mouse_events.html');

  await page.locator('[id="click_area"]').click();
  await expect(page.locator('[id="click_type"]')).toHaveText('Click');

  await page.locator('[id="click_area"]').dblclick();
  await expect(page.locator('[id="click_type"]')).toHaveText('Double-Click');

  await page.locator('#click_area').click({ button: 'right' });
  await expect(page.locator('[id="click_type"]')).toHaveText('Right-Click');

 });

 
test('radio', async ({ page }) => {
  await page.goto('http://test.rubywatir.com/radios.php');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('.radioclass').check();

  const radio1 = page.locator('input[type="radio"][value="radio1"]');
  await expect(radio1).not.toBeChecked();

  await radio1.check();
  await expect(radio1).toBeChecked();
});

 
test('checkbox', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  await page.locator('//input[@type="checkbox"][1]').uncheck();
  await expect(page.locator('//input[@type="checkbox"][1]')).not.toBeChecked();
  await page.locator('//input[@type="checkbox"][1]').check();
  //await expect(page.locator('//input[@type="checkbox"][1]').isChecked()).toBeTruthy();
});

test('dropdown', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');
  await page.selectOption('[id="dropdown"]', {
    value: '1'
  })
  await page.pause();
  await page.selectOption('[id="dropdown"]', {
    label: 'Option 2'
  })
  await page.pause();

  await page.selectOption('[id="dropdown"]', {
    index: 2
  })
  await page.pause();

});

test('multiselect', async ({page}) => {
  await page.goto('https://www.testmu.ai/selenium-playground/select-dropdown-demo/');
  await page.selectOption('[id=multi-select]', [
    { value: 'California',},
    { value: 'New Jersey',},
    { value: 'Florida'}
  ]);
  await page.pause();
});

test('dynamic', async ({page}) => {
  await page.goto('https://demo.automationtesting.in/Register.html');
  await page.locator('[role="combobox"]').click();
  await page.locator('//li[text()="India"]').click();
  await page.pause();
});


test('alert', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', async(alert) => {
    const alertMessage = alert.message();
    expect(alertMessage).toEqual('I am a JS Alert');
    await alert.accept();
    await expect(page.locator('[id="result"]')).toHaveText('You successfully clicked an alert');
  });
   await page.locator('[onclick="jsAlert()"]').click();
});

test('confirmation ok', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', async(alert) => {
    const alertMessage = alert.message();
    expect(alertMessage).toEqual('I am a JS Confirm');
    await alert.accept();
    await expect(page.locator('[id="result"]')).toHaveText('You clicked: Ok');
  });
   await page.locator('[onclick="jsConfirm()"]').click();
});

test('confirmation cancel', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', async(alert) => {
    const alertMessage = alert.message();
    expect(alertMessage).toEqual('I am a JS Confirm');
    await alert.dismiss();
    await expect(page.locator('[id="result"]')).toHaveText('You clicked: Cancel');
  });
   await page.locator('[onclick="jsConfirm()"]').click();
});

test.only('cancelpromptalert', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', async(alert) => {
    const alertMessage = alert.message();
    expect(alertMessage).toEqual('I am a JS prompt');
    await alert.dismiss();
    await expect(page.locator('[id="result"]')).toHaveText('You clicked: null');
  });
   await page.locator('[onclick="jsPrompt()"]').click();
});

test.only('promptalertok', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', async(alert) => {
    const alertMessage = alert.message();
    expect(alertMessage).toEqual('I am a JS prompt');
    await alert.accept('marwa');
    await expect(page.locator('[id="result"]')).toHaveText('You entered: marwa');
  });
   await page.locator('[onclick="jsPrompt()"]').click();
});
/*
test('frames', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/nested_frames');
  let framesCount = page.frames().length;
  console.log('The Frames count is  ' + framesCount);
  let buttonFrame = page.frameLocator('[src="/frame_bottom"]').locator('//body[contains(text(),"BOTTOM")]');
  await expect(buttonFrame).toHaveText('BOTTOM');
  let topFrame = page.frameLocator('frame-top');
  let topFrameChildren = topFrame?.childFrames();
  let middleFrame = topFrameChilds[1];
  
});
*/
test('frames', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/nested_frames');

  // عدد الفريمات
  const framesCount = page.frames().length;
  console.log('The Frames count is ' + framesCount);

  // التحقق من frame_bottom
  const bottomFrameText = page
    .frameLocator('frame[src="/frame_bottom"]')
    .locator('body');

  await expect(bottomFrameText).toHaveText('BOTTOM');
  // الحصول على top frame (Frame مش FrameLocator)
  const topFrame = page.frame({ name: 'frame-top' });
  expect(topFrame).not.toBeNull();
  // الحصول على child frames
  const topFrameChildren = topFrame!.childFrames();
  // الوصول إلى middle frame بالاسم (أفضل من index)
  const middleFrame = topFrameChildren.find(
    frame => frame.name() === 'frame-middle'
  );
  // التحقق من النص داخل middle frame
  const middleText = await middleFrame!
    .locator('#content')
    .textContent();

  console.log('Middle frame text:', middleText);
});
test('tabs', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  const [newTab] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('[href="/windows/new"]').click()
  ]);

  await newTab.waitForLoadState();

  await expect(page.locator('h3'))
    .toContainText('Opening a new window');

  await expect(newTab.locator('h3'))
    .toContainText('New Window');

  await newTab.close();
  await page.close();
});

test('windows', async ({ page }) => {
  await page.goto('https://demo.automationtesting.in/Windows.html');
  await page.locator('a[href="#Seperate"]').click();

  const [newTab] = await Promise.all([
    page.context().waitForEvent('page'),
    await page.locator('[onclick="newwindow()"]').click()
  ]);

  await newTab.waitForLoadState();
  await newTab.locator('[href="/downloads"]').click();
  await expect(newTab.locator('[class="d-1"]')).toContainText('Downloads');

  await page.locator('[href="Index.html"]').click();
  await expect(page.locator('[id="btn1"]')).toHaveText('Sign In');

  await page.close();
});

test('dragAndDrop', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

  const boxA = page.locator('#column-a');
  const boxB = page.locator('#column-b');

  await boxA.hover();
  await page.mouse.down();
  await boxB.hover();
  await page.mouse.up();

  await page.waitForTimeout(2000);

  await boxB.dragTo(boxA);
  await page.waitForTimeout(2000);

  page.close();
});

test('download', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/download');
  const download = await Promise.all([
  page.waitForEvent('download'), 
  await page.locator('[href="download/random_data.txt"]').click()
]);
  const downloadedFile = download[0];
  const downloadedFilePath = await downloadedFile.path();
  const downloadedFileName = downloadedFile.suggestedFilename();
  await downloadedFile.saveAs(downloadedFileName);
  console.log(`The downloaded file path is ${downloadedFilePath}`);
  page.close();
});

test('upload', async ({ page }) => {
  // فتح صفحة رفع الملفات
  await page.goto('https://the-internet.herokuapp.com/upload');
  // انتظار ظهور نافذة اختيار الملف بعد الضغط على زر الرفع
  const fileUpload = await Promise.all([
    page.waitForEvent('filechooser'),
    await page.locator('#file-upload').click()
  ]);
  // تحديد الملف المطلوب رفعه من الجهاز
  await fileUpload[0].setFiles('./random_data.txt');
  // الضغط على زر الإرسال لرفع الملف
  await page.locator('#file-submit').click();
  // انتظار مؤقت بعد رفع الملف
  await page.waitForTimeout(2000);
  // إغلاق الصفحة
  await page.close();
});
