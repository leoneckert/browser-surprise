var express = require('express');
var app = express();
var http = require('http').Server(app);
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
  // res.send(req.query.sendurl); 
  var clientIP = req.connection.remoteAddress;
	if (!sitesByUser[clientIP]){ 	// check if device already communicated with:
		sitesByUser[clientIP] = {}
		sitesByUser[clientIP][req.query.sendurl] = 1;
	}else{
		sitesByUser[clientIP][req.query.sendurl] = 1;
	}
	console.log(sitesByUser);
});

//   __                  _   _                 
//  / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
// | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
// |  _| |_| | | | | (__| |_| | (_) | | | \__ \
// |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

function urlOtherThanClients(clientsIP){
	for(ip in sitesByUser){
		for(site in sitesByUser[ip]){
			if(site){
				if(ip != clientsIP){
					return true;
				}
			}
		}
	}
	// console.log('only client ' + clientsIP + " is active.");
	return false;
}

// from: http://stackoverflow.com/a/2532251
function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function randomUrlFromOtherClient(clientsIP){
	var ranUrl = "";
	var ipAssociated = clientsIP;


	while(ranUrl == "" && ipAssociated == clientsIP){
		ipAssociated = pickRandomProperty(sitesByUser);
		console.log('picked this ip: ' + ipAssociated);
		ranUrl = pickRandomProperty(sitesByUser[ipAssociated]);
		console.log('picked this site: ' + ranUrl);
	}
	var urlIPpair = [];
	urlIPpair.push(ranUrl);
	urlIPpair.push(ipAssociated);
	console.log('created this pack: ' + urlIPpair);
	return urlIPpair;
}



//                     _              _ 
//  ___  ___ _ __   __| |  _   _ _ __| |
// / __|/ _ \ '_ \ / _` | | | | | '__| |
// \__ \  __/ | | | (_| | | |_| | |  | |
// |___/\___|_| |_|\__,_|  \__,_|_|  |_|
                                     

var deviceNewURLtimer = {}
var browserSurpriseInterval = 20; //in seconds
app.get('/getNewUrl', function (req, res) {
	var URLtoSend = "";
	var clientIP = req.connection.remoteAddress;
	// check if device already communicated with:
	if (!deviceNewURLtimer[clientIP]){
		deviceNewURLtimer[clientIP] = new Date().getTime() / 1000;
		
		// send back a new url (like below)!

		// if(urlOtherThanClients(clientIP)){
		// 	console.log('Yes');
		// }

	}else{
		var currentTime = new Date().getTime() / 1000;
		
		if(currentTime - deviceNewURLtimer[clientIP] >= browserSurpriseInterval){
			// console.log('[?] client ' + clientIP + ' would get an url now. ' + currentTime - deviceNewURLtimer[clientIP] + " seconds since the last time.")
			if(urlOtherThanClients(clientIP)){
				var urlIPpair = randomUrlFromOtherClient(clientIP);
				URLtoSend = urlIPpair[0] + "####Browser-Surprise####";
				console.log("[+] " + URLtoSend + " originally visited by client " + urlIPpair[0] + " is sent to client " + clientIP);
				
				delete sitesByUser[urlIPpair[1]][urlIPpair[0]];
				console.log("updated: \n" + sitesByUser);

				deviceNewURLtimer[clientIP] = new Date().getTime() / 1000;
			}
			// URLtoSend = "http://www.artdelicorp.com/img2/browser-surprise.png####Browser-Surprise####";
			// 
			//update the timer:
			
		}
	}

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(URLtoSend);

});