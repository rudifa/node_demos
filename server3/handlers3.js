// server2-handlers.js
// based on http://www.nodebeginner.org/

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called");

    var html = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        'Select a picture file to upload:<br><br>'+
        '<input type="file" name="upload" width="50%"><br><br>'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called");

    var form = new formidable.IncomingForm();
    console.log("upload, about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("upload, parsing done");
        // remove the temp file first - workaround for a Windows problem replacing a file
        fs.rename(files.upload.path, "/tmp/test.jpg", function(err) {
            if (err) {
                fs.unlink("/tmp/test.jpg");
                fs.rename(files.upload.path, "/tmp/test.jpg");
            }
        });

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br>");
        response.write("<img src='/show' style='width: 50%;' />");
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called");
    fs.readFile("/tmp/test.jpg", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else {
            response.writeHead(200, {"Content-Type": "image/jpg"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
