var express = require('express');
var app = express();
var http = require('http').Server(app);
var bs = require('./functions.js');
// Start server listening on port 3000
app.listen(3000, function () {
  console.log('Browser Surprise listening on port 3000!');
});

app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});

//                    _             _        _         
//  _ __ ___  ___ ___(_)_   _____  | |_ __ _| |__  ___ 
// | '__/ _ \/ __/ _ \ \ \ / / _ \ | __/ _` | '_ \/ __|
// | | |  __/ (_|  __/ |\ V /  __/ | || (_| | |_) \__ \
// |_|  \___|\___\___|_| \_/ \___|  \__\__,_|_.__/|___/


var sitesByUser = {}


app.get('/sendAFile', function (req, res) {
  

  var clientIP = req.connection.remoteAddress;
	if (!sitesByUser[clientIP]){ 	// check if device already communicated with:
		sitesByUser[clientIP] = {}
		sitesByUser[clientIP][req.query.sendurl] = req.query.sendhost;
		
	}else{

		sitesByUser[clientIP][req.query.sendurl] = req.query.sendhost;

	}
	console.log(sitesByUser);
});



//                     _              _ 
//  ___  ___ _ __   __| |  _   _ _ __| |
// / __|/ _ \ '_ \ / _` | | | | | '__| |
// \__ \  __/ | | | (_| | | |_| | |  | |
// |___/\___|_| |_|\__,_|  \__,_|_|  |_|
                                     

// var deviceNewURLtimer = {}
// var browserSurpriseInterval = 20; //in seconds
// app.get('/getNewUrl', function (req, res) {
// 	var URLtoSend = "";
// 	var clientIP = req.connection.remoteAddress;
// 	// check if device already communicated with:
// 	if (!deviceNewURLtimer[clientIP]){
// 		deviceNewURLtimer[clientIP] = new Date().getTime() / 1000;
		
// 		// send back a new url (like below)!

// 		// if(urlOtherThanClients(clientIP)){
// 		// 	console.log('Yes');
// 		// }

// 	}else{
// 		var currentTime = new Date().getTime() / 1000;
		
// 		if(currentTime - deviceNewURLtimer[clientIP] >= browserSurpriseInterval){
// 			// console.log('[?] client ' + clientIP + ' would get an url now. ' + currentTime - deviceNewURLtimer[clientIP] + " seconds since the last time.")
// 			if(urlOtherThanClients(clientIP)){
// 				var urlIPpair = randomUrlFromOtherClient(clientIP);
// 				console.log('received this object ' + urlIPpair);
// 				URLtoSend = urlIPpair[0] + "####Browser-Surprise####";
// 				console.log("[+] " + URLtoSend + " originally visited by client " + urlIPpair[1] + " is sent to client " + clientIP);
				

// 				if (!surpriseRecordByUser[clientIP]){ 	// check if device already communicated with:
// 					surpriseRecordByUser[clientIP] = {}
// 					surpriseRecordByUser[clientIP][urlIPpair[0]] = urlIPpair[2];
// 				}else{
// 					surpriseRecordByUser[clientIP][urlIPpair[0]] = urlIPpair[2];
// 				}
// 				console.log('this is the surprise history:');
// 				console.log(surpriseRecordByUser);
			
// 				delete sitesByUser[urlIPpair[1]][urlIPpair[0]];
// 				console.log("updated: \n" + sitesByUser);

// 				deviceNewURLtimer[clientIP] = new Date().getTime() / 1000;
// 			}
// 			// URLtoSend = "http://www.artdelicorp.com/img2/browser-surprise.png####Browser-Surprise####";
// 			// 
// 			//update the timer:
			
// 		}
// 	}

//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.end(URLtoSend);

});