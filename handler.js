'use strict';

const chromium = require('chrome-aws-lambda');

module.exports.login = async (event, context) => {

  console.log("Logging into stackoverflow.com");

  let result = null;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    let page = await browser.newPage();

    await page.goto(event.url || 'https://shanehopcroft.com');
    result = await page.title();

  } catch (error) {
    return context.fail(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  console.log("All good");
  return context.succeed(result);
};
