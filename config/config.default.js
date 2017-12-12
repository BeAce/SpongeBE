'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513072621872_6148';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    url: 'mongodb://127.0.0.1/article',
    options: {},
  };
  config.security = {
    csrf: false,
  };
  return config;
};
