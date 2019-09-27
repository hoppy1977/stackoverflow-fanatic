'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: testFunction(),
      input: event,
    }),
  };
};

function testFunction() {
  return 'Ferrets are cool';
} 
