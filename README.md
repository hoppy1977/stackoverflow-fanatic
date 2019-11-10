# stackoverflow-fanatic
## Overview
AWS Lambda method to 'visit' stackoverflow for the [Enthusiast](https://stackoverflow.com/help/badges/83/fanatic) &amp; [Fanatic](https://stackoverflow.com/help/badges/71/enthusiast) badges.

## Background
When I found out about the Fantatic badge I tried to find a script to run which would earn the badge for me.
My criteria were:
* Must be run to completion without intervention
* Must run in the cloud
* Must be free, or virtually free

A few options I looked at were interesting, specifically:
* https://github.com/Thom-x/stackoverflow-fanatic
* https://github.com/modocache/stackoverflow-fanatic
* https://github.com/alexsomai/stackoverflow-fanatic-badge

I drew inspiration from all of these, but ultimately I decided to make my own version.

Nice features about my project are:
* It is free - that is it operates runs well within the AWS free usage tier. Alert text messages will set you back about AUD$0.06, but that is it.
* It is serverless
* It is simple to deploy
* It will alert you by text message if it stops working and you need to intervene to maintain your 100-day streak.

## Prerequsites
1. You need an AWS account.
2. You have Node.JS installed.

## Setup
First clone the repo:
```
git clone https://github.com/hoppy1977/stackoverflow-fanatic.git
```

Install the NPM packages:
```
npm install
```

Now you just need to put your credentials in the AWS parameter store:
1. Login to AWS
2. Go to the 'Systems Manager' service
3. Go to 'Parameter Store'
4. Create the following parameters:

| Parameter Name                                  | Value         |
| ----------------------------------------------- | ------------- |
| /StackOverflowFanatic/PhoneNumber               | The mobile phone number that you  want to receive any SMS alert messages on.<br/>Must be in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| /StackOverflowFanatic/StackOverflow/DisplayName | Your stackoverflow username.<br/>This is compared against the value that is read from the page after you have logged in to ensure that the script has logged into the correct page. |
| /StackOverflowFanatic/StackOverflow/Email       | Your stackoverflow email address.<br/>Used for logging in. |
| /StackOverflowFanatic/StackOverflow/Password    | Your stackoverflow password.  |

# Deployment
You're almost done! Now you just need to deploy to the cloud:
```
serverless deploy
```

# Standard Operation
Out of the box the tool is configured to login to your stackoverflow account and browse to the profile page every three hours.

If for some reason it fails to login three times in a row AWS will set the alert status, and you will receive a text message notifying you that there has been a problem.

Note that if you get a text messagge like this you have a window of 15 hours to log into your stackoverflow account to keep your streak going!

When you have fixed the problem and the system is operating normally agin you will get another message confirming that everything is ok.
