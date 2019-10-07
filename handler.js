'use strict';

const puppeteer = require('puppeteer');

module.exports.login = async (event, context) => {

  console.log("Logging into stackoverflow.com");

  //puppeteer.launch()
  await puppeteer.launch({headless: false})
    .then(async browser => {

      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 })
      
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

      //await page.screenshot({ path: 'form.png', fullPage: true });

      // Work out what the display name is
      let actualDisplayName = await page.$eval('#mainbar-full > div.subheader.reloaded.js-user-header > div.mini-avatar > div.name', e => e.innerText);

      await browser.close();
      
      return actualDisplayName;
    }).then((actualDisplayName) => {
      const expectedDisplayName = process.env.STACKOVERFLOW_DISPLAYNAME;
      if(actualDisplayName == expectedDisplayName) {
        console.log("Logged into stackoverflow.com and accessed profile page")
      } else {
        console.error(`Error: We were expecting the profile name to be '${expectedDisplayName}', but it was '${actualDisplayName}'`);
      }
    }).catch((ex) => {
      console.log(ex)
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Ferrets are cool',
      input: event,
    }),
  };
};
