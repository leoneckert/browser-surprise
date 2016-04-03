// To setup: (1) cd in terminal to this folder, (2) type "npm install express"
// documentation: http://expressjs.com

// To run: while inside this folder in terminal, type "node server.js"

// Include express module and initialize app
var express = require('express');

var app = express();
var http = require('http').Server(app);

// Start server listening on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});

app.get('/sendAFile', function (req, res) {
  res.send(req.query.sendurl); 
  console.log("user with ip " + req.connection.remoteAddress + " went to: " + req.query.sendurl)
  // this is the users ip address
  // res.send(req.connection.remoteAddress);
});




var deviceNewURLtimer = {}
var browserSurpriseInterval = 20; //in seconds


app.get('/getNewUrl', function (req, res) {
	var URLtoSend = "";
	var clientIP = req.connection.remoteAddress;
	// check if device already communicated with:
	if (!deviceNewURLtimer[clientIP]){
		// if not, add the IP address and current time
		deviceNewURLtimer[clientIP] = new Date().getTime() / 1000;
		// and return a Url to open as a browser surprise:
		URLtoSend = "http://leoneckert.com";
		console.log("[+] sending this to the client: " + URLtoSend);
	}else{
		// if allready communicated with the client check if it's time to send a new website
		var currentTime = new Date().getTime() / 1000;
		if(currentTime - deviceNewURLtimer[clientIP] >= browserSurpriseInterval){
			URLtoSend = "http://artdelicorp.com/img2/browser-surprise.png";
			console.log("[+] sending this to the client: " + URLtoSend);
			//update the timer:
			deviceNewURLtimer[clientIP] = new Date().getTime() / 1000;
		}else{
			console.log('[-] request from ' + clientIP + " - too early");
		}
	}

    res.writeHead(200, {"Content-Type": "text/plain"});
    
    res.end(URLtoSend);
    // 

});