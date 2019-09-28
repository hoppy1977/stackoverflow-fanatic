'use strict';

const {Builder, By, Key, until} = require('selenium-webdriver');

const email = "shanehopcroft@hotmail.com";
const password = "shane1977";
const displayName = "Shane Hopcroft";

module.exports.login = async (event, context) => {

  console.log("Logging into stackoverflow.com");

  let driver = await new Builder().forBrowser('chrome').build();
  driver.manage().getTimeouts().implicitlyWait = true;
  driver.setPageLoadStrategy = 'normal';

  try {
    await driver.get("https://stackoverflow.com");
    await driver.findElement(By.linkText("Log in")).click();

    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.findElement(By.id("submit-button")).click();

    await driver
      .wait(until.elementLocated(By.className("my-profile js-gps-track")), 5 * 1000)
      .then(console.log("aaa"))
      .then(driver.findElement(By.className("my-profile js-gps-track")).click())
      .then(console.log("bbb"))
      //.then(driver.wait(until.elementLocated(By.className("mini-avatar")), 5 * 1000))
      //.then(avatarElement => avatarElement.findElement(By.className("name")))
      //.then(avatarNameElement => avatarNameElement.getText())
      .then(console.log("Whaaaat?!!?"))
      .catch(ex => {
          console.log(ex);
      });
      //;      
  } finally {
    console.log("Terminating driver");
    await driver.quit();
  }

  driver.sleep(10000);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Ferrets are cool',
      input: event,
    }),
  };
};
