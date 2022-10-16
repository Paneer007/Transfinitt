var fs    = require('fs');
var url   = require('url');
var exec  = require('child_process').exec;
var spawn = require('child_process').spawn;

// Function to download file using wget
var download_file_wget = function(file_url, download_dir, file_name_to_save, onProgress, cb) {

    // extract the file name
    var file_name = url.parse(file_url).pathname.split('/').pop();

    // excute wget using child_process' spawn function
    var child = spawn('wget', ['--no-check-certificate', '-O', download_dir + file_name_to_save, file_url]);

    child.stderr.on('data', function(e) {
        var stdout = e.toString();
        var p = stdout.match(/([0-9]+?\%)+/g);
        if (p && p.length > 0) {
            onProgress && onProgress(p[0])
        }
    });

    // add an 'end' event listener to close the writeable stream
    child.stdout.on('end', function(data) {
        cb && cb(null, download_dir + file_name_to_save);
        child.kill();
    });

    // when the spawn child process exits, check if there were any errors and close the writeable stream
    child.on('exit', function(code) {
        if (code != 0) {
            console.log('Failed: ' + code);
        }
    });
};

module.exports = download_file_wget;