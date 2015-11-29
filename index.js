'use strict'; 

var _ = require('lodash');
var cors = require('cors');
var express = require('express');

module.exports = expressApp;

//////////

function expressApp(config) {
  var app = express();
  
  if(config.cors) {
    app.use(cors());
  }
  
  if(config.routes && config.routes.public) {
    if(Array.isArray(config.routes.public)) {
      _.each(config.routes.public, function (route) {
        route(app);
      });
    } else if (typeof config.routes.public === 'function') {
      config.routes.public(app);
    }
  }
  
  if(config.authorization) {
    app.use(config.authorization);
  }
  
  if(config.routes && config.routes.private) {
    if(Array.isArray(config.routes.private)) {
      _.each(config.routes.private, function (route) {
        route(app);
      });
    } else if (typeof config.routes.private === 'function') {
      config.routes.private(app);
    }
  }
  
  return app;
}
