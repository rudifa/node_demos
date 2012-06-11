// server-3.js
// based on http://www.nodebeginner.org/

var http = require("http"),
    url = require("url");

var router = require("./router3"),
    handlers = require("./handlers3");

var handle = {
    "/": handlers.start,
    "/start": handlers.start,
    "/upload": handlers.upload,
    "/show": handlers.show,
}

function serverStart(route, handle) {
    var count = 0;
    function onRequest(request, response) {
        ++count;
        var pathname = url.parse(request.url).pathname;
        console.log("request #" + count + " received: pathname " + pathname);
        route(handle, pathname, response, request);
    }
    http.createServer(onRequest).listen(8888);
    console.log("http server started on port 8888");
}

serverStart(router.route, handle);






