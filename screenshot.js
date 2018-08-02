const puppeteer = require('puppeteer');
require('dotenv').load();

const screenshot = 'ss.png';
(async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  console.log('Loaded login page')

  await page.goto(process.env.URL_LOGIN)
  await page.type('#ctl00_c_userName', process.env.LOGIN_USER)
  await page.type('#ctl00_c_ucPassword_txtPinPad', process.env.LOGIN_PWD)
  await page.click('#ctl00_c_btnSignOn')
  console.log('Clicked login')

  await page.waitForNavigation()
  console.log('Loaded welcome page')

  await page.hover('ul li.has-popup')
  console.log('Hover Move Money')
  
  await page.click('ul a.level2')
  console.log('Clicked Transfer link')

  /*await page.waitForNavigation({waitUntil: 'networkidle2'})
  
  await page.screenshot({ path: screenshot })
  console.log("Screenshot taken")*/

  //await page.waitForSelector('.dropDownList.fromAccount')
  
  await page.waitForSelector('.dropDownList.fromAccount')
  console.log("Transfer page loaded")

  await page.waitFor(5000);
  
  const dropdowns = await page.$$('.dropDownList.fromAccount')
  await dropdowns[0].click()
  
  
  //await page.click('.dropDownList.fromAccount')
  //console.log("Click from account")

  await page.click('#ctl00_c_tfControl_ddlItemsFromAccount .multSelItem:nth-child(2)')
  console.log("Select from account")

  await page.click('#ctl00_c_tfControl_tbddlTransferTo')

  await page.click('.ui-menu .ui-menu-item:nth-child(3)')

  await browser.close()

  console.log('See screenshot: ' + screenshot)
})()