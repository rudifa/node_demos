// server-1-hello.js
// from http://www.nodebeginner.org/
// touched up by rudifa

var http = require("http");

var count = 0;
function onRequest(request, response) {
    ++count;
    console.log("request received " + count);
    
    var html = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    'Hello World #' + count +' from <a href="http://www.nodebeginner.org/">nodebeginner</a>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();

}

http.createServer(onRequest).listen(8888);

console.log("http server started on port 8888");

// prerequisites (Mac): download node installer for Mac form nodejs.org and install it
// to run:
// $ node server-1-hello.js
// open the url http://localhost:8888
// refresh the page a few times

