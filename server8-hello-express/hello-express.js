// http://howtonode.org/getting-started-with-express

var express = require('express'),
    app = express.createServer();
    
app.use(express.logger());

var count = 0;

// define a route : method, path, callback
app.get('/', function(req, res) {
    res.send('Hello Express World ' + count++);
});

var port = 3000;    // the default port
app.listen(port); 

console.log('Express server started on port %s', port);

//console.log(app); // ok
//console.log(app.address()); // fails

    