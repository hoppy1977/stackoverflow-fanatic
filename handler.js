'use strict';

const {Builder, By, Key, until} = require('selenium-webdriver');

const email = "shanehopcroft@hotmail.com";
const password = "<REDACTED>";
const displayName = "Shane Hopcroft";

module.exports.login = async (event, context) => {

  console.log("Logging into stackoverflow.com");

  let driver = await new Builder().forBrowser('chrome').build();
//  driver.manage().timeouts().implicitlyWait();
driver.manage().getTimeouts().implicitlyWait = true;

  try {
    await driver.get("https://stackoverflow.com");
    await driver.findElement(By.linkText("Log in")).click();

    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.findElement(By.id("submit-button")).click();

    await driver.findElement(By.className("my-profile js-gps-track")).click();
    // let avatarElement = await driver.findElement(By.ClassName("mini-avatar"));

    // if (avatarElement.text == displayName) {
    //   console.log("Logged into stackoverflow.com and accessed profile page");
    // } else {
    //   console.log("Error: Something went wrong!");
    // }

//    await driver.sleep(2000);

  } finally {
    console.log("Terminating driver");
    await driver.quit();
  }



  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Ferrets are cool',
      input: event,
    }),
  };
};
