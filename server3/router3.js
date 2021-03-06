// router3.js
// based on http://www.nodebeginner.org/

function route(handle, pathname, response, request) {
    console.log("About to route a request for pathname " + pathname);
    //console.log(handle)
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    }
    else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
