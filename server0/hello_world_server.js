// http://net.tutsplus.com/tutorials/javascript-ajax/learning-serverside-javascript-with-node-js/
// updated 0.6.19 names

var util = require("util"),
    http = require("http");
	
http.createServer(function(request, response) {
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write("Hello World!");
    response.end();
}).listen(8888);

util.puts("Server running at http://localhost:8888/");
