'use strict';

var utils = require('../utils/writer.js');
var Pipeline = require('../service/PipelineService');

module.exports.addPipelines = function addPipelines (req, res, next) {
  var config = req.swagger.params['config'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Pipeline.addPipelines(config)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response,500);
      });
  }
};

module.exports.deletePipeline = function deletePipeline (req, res, next) {
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Pipeline.deletePipeline()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response,500);
      });
  }
};

module.exports.deleteConfigFile = function deleteConfigFile (req, res, next) {
  var pattern = req.swagger.params['pattern'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Pipeline.deleteConfigFile( pattern )
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response,500);
      });
    }
};


module.exports.getConfigFile = function getConfigFile (req, res, next) {
  var file = req.swagger.params['file'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Pipeline.getConfigFile(file)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response, 500);
      });
  }
};

module.exports.pipelinesConfigFile = function pipelinesConfigFile (req, res, next) {
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Pipeline.pipelinesConfigFile()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response,500);
      });
  }
};

module.exports.putPipelinesConfigFile = function putPipelinesConfigFile (req, res, next) {
  var config = req.swagger.params['config'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Pipeline.putPipelinesConfigFile(config)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response,500);
      });
  }
};

module.exports.pipelineslistConfig = function pipelineslistConfig (req, res, next) {
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Pipeline.pipelineslistConfig()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response,500);
    });
  }
  
};

module.exports.updatePipeline = function updatePipeline (req, res, next) {
  var config = req.swagger.params['config'].value;
  if ( res.statusCode === 400 ) {
    utils.writeJson(res, '{"login":"KO"}',400);
  } else {
    Pipeline.updatePipeline(config)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};
