// server2-handlers.js
// based on http://www.nodebeginner.org/

var querystring = require("querystring"),
    fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called");

    var html = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea><br>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '<p>Available queries:<br>'+
        '/start : this page (add some text and Submit text)<br>'+
        '/show : shows a picture<br>'+
        '</body>'+
        '</html>';
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You have sent the text: " + querystring.parse(postData).text);
    response.end();
}

function show(response, postData) {
    console.log("Request handler 'start' was called");
    fs.readFile("./server2-sample.jpg", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
