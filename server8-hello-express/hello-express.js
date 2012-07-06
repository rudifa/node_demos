// http://howtonode.org/getting-started-with-express

var express = require('express'),
    app = express.createServer();
    
app.use(express.logger()); // logs failed requests e.g. for favicon

app.use(express.favicon(__dirname + '/favicon.ico', { maxAge: 2592000000 })); // OK

var count = 0;

// define a route : method, path, callback
app.get('/', function(req, res) {
    res.send('Hello Express World ' + count++);
});

var port = 3000;    // the default port
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

});  

//console.log('Express server started on port %s', port);

//console.log(app); // ok
//console.log(app.address()); // fails

