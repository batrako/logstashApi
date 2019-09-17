'use strict';


/**
 * Add a new patterns config files
 * Replace current global patterns by a new configuration provided. **All current patterns files will be deleted**
 *
 * config File Zip file with global logstash patterns config
 * no response value expected for this operation
 **/
exports.addPatterns = function(config) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete all logstash patterns config files
 * **Delete** all logstash patterns config files
 *
 * no response value expected for this operation
 **/
exports.deletePatterns = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete specific patterns file
 * **Delete** specific patterns file relative to path `/usr/share/logstash/config/patterns.
 *
 * file String patterns file to delete content (optional)
 * no response value expected for this operation
 **/
exports.deletePatternsFile = function(file) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete specific patterns folder
 * **Delete** specific patterns folder relative to path `/usr/share/logstash/config/patterns.
 *
 * folder String patterns folder to delete content (optional)
 * no response value expected for this operation
 **/
exports.deletePatternsFolder = function(folder) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * returns content of especific logstash patterns file
 * returns content of especific logstash patterns file relative to `/usr/share/logstash/config/patterns` path
 *
 * file String file to return content (optional)
 * no response value expected for this operation
 **/
exports.getPatternsFile = function(file) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * returns full list of patterns files 
 * returns full content list of current logstash patterns files
 *
 * returns List
 **/
exports.patternslistConfig = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "owner" : "owner",
  "path" : "path",
  "permissions" : "permissions",
  "group" : "group"
}, {
  "owner" : "owner",
  "path" : "path",
  "permissions" : "permissions",
  "group" : "group"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update patterns config files
 * update/replace current patterns files.if new files added , old files **DOES NOT** will be deleted
 *
 * config File Zip file with patterns files structure relative to /usr/share/logstash/config/patterns
 * no response value expected for this operation
 **/
exports.updatePatterns = function(config) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

