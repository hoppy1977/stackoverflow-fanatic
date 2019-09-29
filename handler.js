'use strict';

const {Builder, By, until} = require('selenium-webdriver');

const email = "shanehopcroft@hotmail.com";
const password = "<REDACTED>";
const displayName = "Hoppy";

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

    await driver.wait(until.elementLocated(By.className("my-profile")), 5 * 1000);
    await driver.findElement(By.className("my-profile")).click();
    await driver.wait(until.elementLocated(By.className("mini-avatar")), 5 * 1000);

    let avatarElement = await driver.findElement(By.className("mini-avatar"));
    let avatarNameElement = await avatarElement.findElement(By.className("name"));

    await avatarNameElement.getText()
      .then(actualDisplayName => {

      if(actualDisplayName == displayName) {
        console.log("Logged into stackoverflow.com and accessed profile page")
      } else {
        console.error(`Error: We were expecting the profile name to be '${displayName}', but it was '${actualDisplayName}'`);
      }
    })
 
  } catch(ex) {
    console.Error(ex);
  } finally {
    console.log("Terminating driver");
    await driver.quit();
  }

  driver.sleep(1000);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Ferrets are cool',
      input: event,
    }),
  };
};
