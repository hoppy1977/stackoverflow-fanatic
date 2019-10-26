'use strict';

module.exports.login = async (event, context) => {

  console.log("Logging into stackoverflow.com");

  let browser = null;

  try {
    console.log("IS_LOCAL: " + process.env.IS_LOCAL);
    if(process.env.IS_LOCAL) {
      const puppeteer = require('puppeteer');
      
      browser = await puppeteer.launch({
          //headless: false
      });
    } else {
      const chromium = require('chrome-aws-lambda');

      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      });
    }

    let page = await browser.newPage();

    await page.goto('https://www.stackoverflow.com', {waitUntil: 'networkidle2'});
    
    // Click on the 'Log in' button
    await Promise.all([
      page.click('body > header > div > ol.-secondary.js-secondary-topbar-links.drop-icons-responsively.user-logged-out.the-js-is-handling-responsiveness > li.-ctas > a.login-link.s-btn.btn-topbar-clear.py8.js-gps-track'),
      page.waitForNavigation(),    
    ]);

    // Type the email
    await page.focus('#email')
    await page.keyboard.type(process.env.STACKOVERFLOW_EMAIL);

    // Type the password
    await page.focus('#password')
    await page.keyboard.type(process.env.STACKOVERFLOW_PASSWORD);

    // Click submit
    await Promise.all([
      page.click('#submit-button'),
      page.waitForNavigation(),
    ]);     

    // Click on the profile icon
    await Promise.all([
      page.click('body > header > div > ol.-secondary.js-secondary-topbar-links.drop-icons-responsively.user-logged-in.the-js-is-handling-responsiveness > li:nth-child(2) > a'),
      page.waitForNavigation(),
    ])

    // Work out what the display name is
    const actualDisplayName = await page.$eval('#mainbar-full > div.subheader.reloaded.js-user-header > div.mini-avatar > div.name', e => e.innerText);

    // Work out if the expected display name matches the actual one found on the page
    const expectedDisplayName = process.env.STACKOVERFLOW_DISPLAYNAME;
    if(actualDisplayName == expectedDisplayName) {
      return context.succeed("Logged into stackoverflow.com and accessed profile page");
    } else {
      return context.fail(`Error: We were expecting the profile name to be '${expectedDisplayName}', but it was '${actualDisplayName}'`);
    }
  } catch (error) {
    return context.fail(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
