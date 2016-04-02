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
