'use strict';

var utils = require('../utils/writer.js');
var Patterns = require('../service/PatternsService');

module.exports.addPatterns = function addPatterns (req, res, next) {
  var config = req.swagger.params['config'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Patterns.addPatterns(config)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    }
};

module.exports.deletePatterns = function deletePatterns (req, res, next) {
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Patterns.deletePatterns()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};

module.exports.deletePatternsFile = function deletePatternsFile (req, res, next) {
  var file = req.swagger.params['file'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Patterns.deletePatternsFile(file)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};

module.exports.deletePatternsFolder = function deletePatternsFolder (req, res, next) {
  var folder = req.swagger.params['folder'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Patterns.deletePatternsFolder(folder)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};

module.exports.getPatternsFile = function getPatternsFile (req, res, next) {
  var file = req.swagger.params['file'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Patterns.getPatternsFile(file)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    }
};

module.exports.patternslistConfig = function patternslistConfig (req, res, next) {
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Patterns.patternslistConfig()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};

module.exports.updatePatterns = function updatePatterns (req, res, next) {
  var config = req.swagger.params['config'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Patterns.updatePatterns(config)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    }
};
