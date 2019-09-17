'use strict';

const formidable = require('formidable'),
    path = require('path'),
    fs = require('fs-extra'),
    utils = require('../utils/utils'),
    glob= require('glob'),
    logger = require('../utils/logger');
//const uploadDir = path.normalize(utils.getEnvironmentVar('LOGSTASH_CONFIG_PATH','/usr/share/logstash/config'));

const configDir = path.normalize(utils.getEnvironmentVar('LOGSTASH_CONFIG_PATH','/usr/share/logstash/config'));
const configPipelineDir = configDir + '/pipeline';
const configPatternsDir = configDir  + '/patterns';
    

/**
 * Add a new global Logstash pipelines configuration
 * Replace current global logstash pipelines config by a new configuration
 *
 * config File Zip file with global logstash pipeline config
 * no response value expected for this operation
 **/
exports.addPipelines = function(config) {
  return new Promise(function(resolve, reject) {
    var response = {};
    try {
      // Caution: Following lines delete all previous config files
      utils.deletePreviousConf(configDir);
    } catch (err) {
      console.log (err);
      reject(response['application/json'] = { "uploaded" : false })
    }
    if  ( utils.unzipBufferToDisk(config.buffer, configDir) ) {
      reject(response['application/json'] = { "uploaded" : false });
    } else {
      resolve(response['application/json'] = { "uploaded" : true });
    }  
  });
}


/**
 * Init logstash pipeline config
 * Restore init logstash pipelines config with one dummy pipeline
 *
 * no response value expected for this operation
 **/
exports.deletePipeline = function() {
  return new Promise(function(resolve, reject) {
    var response = {};
    var errorOccurs = 0; 
    try {
      utils.deletePreviousConf(configDir);
      if (!fs.existsSync(configPatternsDir)){
        fs.mkdirSync(configPatternsDir);
      }
      if (!fs.existsSync(configPipelineDir)){
        fs.mkdirSync(configPipelineDir);
      }
      fs.writeFileSync(configDir + '/pipelines.yml', '- pipeline.id: main\n  path.config: "/usr/share/logstash/config/pipeline/pipeline.conf"\n')
      fs.writeFileSync(configPipelineDir + '/pipeline.conf', 'input {\n  beats {\n    port => 5044\n  }\n}\n\noutput {\n  stdout {\n    codec => rubydebug\n  }\n}\n\n')
      if (! errorOccurs ) {
        resolve(response['application/json'] = { "init" : true })
      }
      
    } catch (err) {
        errorOccurs=1;
        console.log(err);
        reject(response['application/json'] = { "init" : false })
    }
  });
}

exports.deleteConfigFile = function (pattern ) {
  return new Promise(function(resolve, reject) {
    var response={};
    var errorOccurs=0;
    try {
      utils.deleteFiles(configPipelineDir + '/' + pattern, true );
    } catch (err) {
      errorOccurs=1;
      console.log(err);
      reject(response['application/json'] = { "deleted" : false })
    }
    if (! errorOccurs ) {
      resolve(response['application/json'] = { "deleted" : true })
    }
  });
}

/**
 * returns content of especific logstash config file
 * returns content of especific logstash config file relative to `/usr/share/logstash/config/pipeline` path
 *
 * file String file to return content (optional)
 * no response value expected for this operation
 **/
exports.getConfigFile = function(file) {
  return new Promise(function(resolve, reject) {
    var response = {};
    var errorOccurs = 0; 
    try {
      var fileBuffer=utils.downloadFile(configPipelineDir + '/'+ file);
      
    } catch (err) {
      errorOccurs=1;
      console.log(err);
      reject(response['application/json'] = { "getConfigFile" : "error" })
    }
    if (! errorOccurs ) {
      resolve(response['application/json'] = fileBuffer)
    }
  });
}


/**
 * returns pipelines.yml content
 * returns content of current `pipelines.yml` config file
 *
 * no response value expected for this operation
 **/
exports.pipelinesConfigFile = function() {
  return new Promise(function(resolve, reject) {
    var response={};
    var errorOccurs = 0;
    var file={};
    try {
      var file=utils.downloadFile(configDir + '/pipelines.yml');
    } catch (err) {
      errorOccurs=1;
      console.log(err);
      reject(response['application/json'] = { "pipelinesConfigFile" : "error" })
    }
    if (! errorOccurs ) {
      resolve(response['application/json'] =  file )
    } 
  });
}


/**
 * update pipelines.yml content
 * update content of current `pipelines.yml` config file
 *
 * no response value expected for this operation
 **/
exports.putPipelinesConfigFile = function(config) {
  return new Promise(function(resolve, reject) {
    var response={};
    var errorOccurs = 0;
    try {
      if (config.originalname == "pipelines.yml") {
        fs.writeFileSync(configDir + '/pipelines.yml', config.buffer);
      } else {
        errorOccurs=1;
        reject(response['application/json'] = { "updated" : false })
      }
      
    } catch (err) {
      errorOccurs=1;
      console.log(err);
      reject(response['application/json'] = { "updated" : false })
    }
    if (! errorOccurs ) {
      resolve(response['application/json'] =  { "updated": true } )
    } 
  });
}

/**
 * returns full content list of current logstash config files 
 * returns full content list of current logstash config files
 *
 * returns List
 **/
exports.pipelineslistConfig = function() {
  return new Promise(function(resolve, reject) {
    var response={};
    var fileItems=[];
    var errorOccurs=0;
    var vcb=0;
    try {
      var files = glob.sync(configDir + '/**/*').forEach((file) => {
        var fileObject=utils.downloadFile(file);
        delete fileObject['content'];
        if ( Object.keys(fileObject).length >0 ) {
          fileItems[vcb++]=fileObject;
        }
      });
    } catch (err) {
      errorOccurs=1;
      console.log(err);
      reject(response['application/json'] = { "pipelineslistConfig" : "error" })
    }
    if (! errorOccurs ) {
      resolve(response['application/json'] =  fileItems )
    }
  });
}


/**
 * Update pipeline configuration
 * Update current logstash pipeline configuration without delete previos configuration.
 *
 * config File Zip file with update files of pipelines logstash config
 * no response value expected for this operation
 **/
exports.updatePipeline = function(config) {
  return new Promise(function(resolve, reject) {
    var response = {};
    if  ( utils.unzipBufferToDisk(config.buffer, configPipelineDir) ) {
      reject(response['application/json'] = { "uploaded" : false });
    } else {
      resolve(response['application/json'] = { "uploaded" : true });
    }  
  });
}

