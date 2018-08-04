const puppeteer = require('puppeteer')
require('dotenv').load()

const screenshot = 'ss.png';

(async () => {
  let browser = await puppeteer.launch({ headless: false })
  let page = await browser.newPage()

  await initPage(page)
  await Login(page)
  await LoadTransferPage(page)
  await CompleteTransferForm(page)

  browser.close()
})()

async function initPage(page) {
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8' })
  await page.setViewport({ width: 1280, height: 800 })
}

async function Login(page) {
  await page.goto(process.env.URL_LOGIN, { waitUntil: 'networkidle2' })
  await page.waitForSelector('#ctl00_c_btnSignOn')
  console.log('Loaded login page')
  await page.type('#ctl00_c_userName', process.env.LOGIN_USER)
  await page.type('#ctl00_c_ucPassword_txtPinPad', process.env.LOGIN_PWD)
  await page.click('#ctl00_c_btnSignOn')
  console.log('Clicked login')
  await page.waitForNavigation()
  console.log('Loaded welcome page')
}

async function LoadTransferPage(page) {
  await page.hover('ul li.has-popup')
  console.log('Hover Move Money')

  await page.click('ul a.level2')
  console.log('Clicked Transfer link')

  // Test waiting, since new page load is not registering
  await page.waitFor(5000);

  await page.waitForSelector('.dropDownList.fromAccount')
  console.log("Transfer page loaded")
}

async function CompleteTransferForm(page) {
  console.log("CompleteTransferForm:Start")
  //const dropdowns = await page.$$('.dropDownList.fromAccount')
  //console.log('const dropdowns')
  //await dropdowns[0].click()
  //console.log('dropdowns clicked')
  await page.click('.dropDownList.fromAccount:nth-child(1)')
  console.log("Click from account")

  await page.click('#ctl00_c_tfControl_ddlItemsFromAccount .multSelItem:nth-child(2)')
  console.log("Select from account")

  await page.click('#ctl00_c_tfControl_tbddlTransferTo')

  await page.click('.ui-menu .ui-menu-item:nth-child(3)')
  await page.screenshot({ path: screenshot })
  console.log("Screenshot taken")
  console.log('See screenshot: ' + screenshot)
}
