'use strict';

const fs = require('fs-extra'),
      unzipper = require('unzipper'),
      rimraf = require('rimraf');

exports.getEnvironmentVar = function(varname, defaultvalue) {
    var result = process.env[varname];
    if(result!=undefined)
        return result;
    else
        return defaultvalue;
}

exports.downloadFile = function( file ) {
    var fileObject = {};
    var fileStats = fs.statSync(file);
    if (! fileStats.isDirectory() ) {
        var fileBuffer=fs.readFileSync(file, 'utf8' );
        fileObject['path'] = file;
        fileObject['owner'] = fileStats.uid;
        fileObject['group'] = fileStats.gid;
        fileObject['permissions'] = '0' + (fileStats.mode & parseInt('777', 8)).toString(8);
        fileObject['content'] =fileBuffer;
    }
    return fileObject;
}

exports.deletePreviousConf = function (rootConfFolder) {
    rimraf.sync(rootConfFolder + '/pipeline' + '/*', { glob: true });
    rimraf.sync(rootConfFolder + '/patterns' + '/*', { glob: true });
}

exports.deleteFiles = function (pattern, recursive) {
    rimraf.sync( pattern, { glob: recursive });
}

exports.unzipBufferToDisk = function ( buffer, folder ) {    
    var errorOccurs=0;
    try {
        fs.writeFileSync('/tmp/pipeline.zip',buffer);
    } catch (err) {
        errorOccurs =1;
        console.log (err);
        return errorOccurs;
    }
    try {
        const pipe=fs.createReadStream('/tmp/pipeline.zip')
        .pipe(unzipper.Extract({ path: folder }));
        pipe.on('error',  (err) => {
            console.log(err);
            errorOccurs = 1;
            fs.unlinkSync('/tmp/pipeline.zip');
            return errorOccurs;
        });
        pipe.on('finish',() =>{
            if ( ! errorOccurs ) {
                fs.unlinkSync('/tmp/pipeline.zip');
                return errorOccurs;
            }
        });
    } catch (err) {
        errorOccurs=1;
        console.log(err);
        return errorOccurs;

    }
}
