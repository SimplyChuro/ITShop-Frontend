'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ember-frontend',
    environment,
    rootURL: '/',
    locationType: 'auto',
    USER_TOKEN: '',
    HOST_URL: 'https://ITShop-Travnik-Backend.herokuapp.com',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {}

  };

  if (environment === 'development') {
    ENV.HOST_URL = 'http://localhost:9000';
  }

  if (environment === 'production') {
    ENV.HOST_URL = 'https://ITShop-Travnik-Backend.herokuapp.com';
  }

  return ENV;
};
