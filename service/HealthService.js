'use strict';


/**
 *
 * returns Health
 **/
exports.healthGET = function() {
  return new Promise(function(res, reject) {
      var response = {};
      res(response['application/json'] = { "status" : "OK" });
  });
}

