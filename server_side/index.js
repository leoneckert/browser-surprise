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


// just a test:
var associativeArray = {};
associativeArray["one"] = "First";
associativeArray["two"] = "Second";
associativeArray["three"] = "Third";
console.log(associativeArray);
if(associativeArray["one"]){
	console.log(associativeArray["one"]);
}

app.get('/getNewUrl', function (req, res) {
	var clientIP = req.connection.remoteAddress;
	// check if device already communicated with:
	if (!deviceNewURLtimer[clientIP]){
		deviceNewURLtimer[clientIP] = 0;
	}
	console.log(deviceNewURLtimer);


	console.log("request recieved");
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("HELLO I AM LEON");
    console.log("string sent");

});