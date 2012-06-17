// from http://www.fusioncube.net/index.php/node-js-basics-and-twitter-search

// require Node modules
var http = require("http"),
	url=require("url"),
	path=require("path"),
	fs=require("fs"),
	events=require("events"),
	util = require("util");
	
/**
 * Handle the serving of files with static content
 * 
 * @param {Object} uri
 * @param {Object} response
 */
function load_static_web_file(uri, response) {
    if (uri == '/') {
        uri = '/index.html';
    }
	var filename = path.join(process.cwd(), uri);
	
	console.log("load_static_web_file: " + uri);
	//console.log("load_static_web_file " + filename);
    
	// If file exists send it to the client
	fs.exists(filename, function(exists) {
		
        if (!exists) {
            // File not found: return a 404 error.
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("No such file " + uri);
            response.end();
            return;
        }
        
		// File exists: read it.
        fs.readFile(filename, "binary", function(err, file) {
			
            if (err) {
                // File read failed: return a 500 error.
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err+"\n");
                response.end();
                return;
            }
            
			// File was read: return a 200 header and the file as binary data.
            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
}

var Twitter = (function(){
    var eventEmitter = new events.EventEmitter();
	
    return {
        EventEmitter : eventEmitter,    // The event broadcaster
        oldest_id : 0                   // The ID of the oldest tweet received so far	
    };
})();

/**
 * Get tweets for user
 * 
 * @param {Object} query
 */
function get_tweets(query) {
	
	var username = 'rudifa';
	
	var options = {
		host: "api.twitter.com",
		port: 80,
		method: "GET",
		path: "/1/statuses/user_timeline.json?screen_name=" + username + "&count=5"		
	};
	if (Twitter.oldest_id > 0) {
	   options.path += "&max_id=" + Twitter.oldest_id;
	}
	
	console.log("get_tweets: " + options.host + options.path);
	
	// Send a request to Twitter
	var request = http.request(options)
	
	// register listener for event 'response'
	.on("response", function(response){
		var body = "";
	
		response.on("data", function(data) {
            // append data received from Twitter
            body += data;
			//console.log('data : body.length=', body.length);
		});
	
		response.on("end", function(data) {
			console.log('end : body.length=', body.length);
			
			try {
				// parse the response data
				var tweets = JSON.parse(body);
				
			    console.log('tweets.length=', tweets.length);
				
				if (tweets.length > 0) {
				    
				    // got some tweets
			         console.log('got some tweets, tweets.length=', tweets.length);
				    
				    var newest_id = tweets[0]['id'];
				    var oldest_id = tweets[tweets.length -1]['id'];
				    
				    if (newest_id == Twitter.oldest_id) {
				        // remove it to avoid repetition
				        tweets.shift();
				    }
				    if (tweets.length > 0) {
				        
				        // remember the id
    					Twitter.oldest_id = oldest_id;
 			    console.log('broadcast ');
   
    					// broadcast the event 'tweets' to listeners if any
    					Twitter.EventEmitter.emit("tweets", tweets);
				    }
				}
				
				// remove any previous listeners
				//Twitter.EventEmitter.removeAllListeners("tweets");
			} 
			catch (ex) {
				console.log("get_tweets: bad JSON data: " + body);
			}
		});
	});

	// End the request
	request.end();
}

/**
 * Create an HTTP server listening on port 8888
 * 
 * @param {Object} request
 * @param {Object} response
 */
http.createServer(function (request, response) {
	// Parse the entire URI to get just the pathname
	var uri = url.parse(request.url).pathname;
	
	//console.log('createServer ' + util.inspect(request));
	console.log('createServer ' + uri);
	console.log('query ' + request.url.split("?")[1]);

	
	if (uri === "/twitter") {
	    // user is requesting tweets
  
        // if no response within timeout: return empty JSON array
        var timeout = setTimeout(function() {  
            response.writeHead(200, { "Content-Type" : "text/plain" });  
            response.write(JSON.stringify([]));  
            response.end();  
        }, 5000);
	
	    // Register a listener for the 'tweets' event on the Twitter.EventEmitter.
	    // This event is fired in get_tweets() when new tweets are found and parsed. 
		Twitter.EventEmitter.once("tweets", function(tweets){
		  	//console.log('createServer function(tweets)' + util.inspect(tweets));

            // Send a 200 header and the tweets structure back to the client
			response.writeHead(200, {
				"Content-Type": "text/plain"
			});
			response.write(JSON.stringify(tweets));
			response.end();
			
			// Stop the timeout function from completing (see below)
			clearTimeout(timeout);
		});

        // Parse out the search term
        var query = request.url.split("?")[1];
		
        // Search for tweets with the search term
        get_tweets(query);
	
	/*
	 * For all other requests, try to return a static page by calling the 
	 * load_static_web_file() function.
	 */ 
    } else {  
        load_static_web_file(uri, response);  
    }
}).listen(8888);

// Put a message in the console verifying that the HTTP server is up and running
console.log("Server running at http://127.0.0.1:8888/");