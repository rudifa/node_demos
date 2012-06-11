// server4.js
// from http://dyashkir.com/2011/12/20/Nodejs-tutorial-for-Heather-Payne-Part-1.html

var http = require('http');
var url = require('url');
http.createServer(function (req, res) {

    var parsedUrl = url.parse(req.url, parseQueryString=true);

    if (parsedUrl.query.username) {
        var name = parsedUrl.query.username;
        res.end(name);
    }
    else {
        var page = 
        '<!DOCTYPE html>'+
        '<form>' +
        '<input id=username name=username placeholder="enter name" required>'+
        '<button type=submit>Do it!</button>'+
        '</form>';

        res.end(page);
    }
}).listen(8888, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8888/');