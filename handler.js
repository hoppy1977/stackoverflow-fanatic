'use strict';

module.exports.login = async (event, context) => {

  console.log("Logging into stackoverflow.com");

  // TODO:

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Ferrets are cool',
      input: event,
    }),
  };
};
