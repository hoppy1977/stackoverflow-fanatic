'use strict';

const {Builder, By, Key, until} = require('selenium-webdriver');

const email = "shanehopcroft@hotmail.com";
const password = "<REDACTED>";
const displayName = "Shane Hopcroft";

module.exports.login = async (event, context) => {

  console.log("Logging into stackoverflow.com");

  let driver = await new Builder().forBrowser('chrome').build();
  driver.manage().getTimeouts().implicitlyWait = true;

  try {
    await driver.get("https://stackoverflow.com");
    await driver.findElement(By.linkText("Log in")).click();

    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.findElement(By.id("submit-button")).click();

    await driver.wait(until.elementLocated(By.className("my-profile js-gps-track")), 5 * 1000).then(el => {
      driver.findElement(By.className("my-profile js-gps-track")).click();
    });

    await driver.wait(until.elementLocated(By.className("mini-avatar")), 5 * 1000).then(el => {
      console.log("x");
      let avatarElement = driver.findElement(By.className("mini-avatar"));
      console.log("y");
      console.log(avatarElement);

      console.log("z1");
      avatarElement.getText().then(function(actualDisplayName) {
        console.log("z2");

        console.log(actualDisplayName);

        if (actualDisplayName == displayName) {
          console.log("Logged into stackoverflow.com and accessed profile page");
        } else {
          console.log(`Error: We were expecting the profile name to be '${displayName}', but it was '${actualDisplayName}'!`);
        }
      })
      .catch(x => {
        console.log(x);  
      });
      
    }).catch(x => {
      console.log("Error: Something went wrong!");
      console.log(x);
    });
    
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
