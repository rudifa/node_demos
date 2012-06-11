// server2.js
// based on http://www.nodebeginner.org/

var http = require("http"),
    url = require("url");

var router = require("./router2"),
    handlers = require("./handlers2");

var handle = {
    "/": handlers.start,
    "/start": handlers.start,
    "/upload": handlers.upload,
    "/show": handlers.show,
}

function serverStart(route, handle) {
    var count = 0;
    function onRequest(request, response) {
        var postData = "";
        ++count;
        var pathname = url.parse(request.url).pathname;
        console.log("request #" + count + " received: pathname " + pathname);
        
        request.setEncoding("utf8");
        
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'.");
        });

        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });

    }
    http.createServer(onRequest).listen(8888);
    console.log("http server started on port 8888");
}

serverStart(router.route, handle);






