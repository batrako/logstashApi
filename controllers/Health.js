'use strict';

var utils = require('../utils/writer.js');
var Health = require('../service/HealthService');

module.exports.healthGET = function healthGET (req, res, next) {
  Health.healthGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
