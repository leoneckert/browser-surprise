var express = require('express');
var app = express();
var http = require('http').Server(app);

var User = require('./User.js');

var browserSurpriseInterval = 20; //in seconds


// var bs = require('./functions.js');
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

var users = {};

app.get('/sendAFile', function (req, res) {
	var clientID = req.query.sendID;
	var siteURL = req.query.sendurl;
  	console.log('client ID: ' + clientID);
  	console.log('website visited: ' + siteURL);
  	console.log('--------');
  	if(clientID != null){
	  	//check if user is in users already
	  	if(clientID in users){
	  		users[clientID].ADDwebsiteFromUser(siteURL);
	  	}else{
	  		users[clientID] = new User.create(clientID);
	  		users[clientID].ADDwebsiteFromUser(siteURL);
	  	}
	  	console.log("--------------------------------------------");
	  	console.log("---------------this is the users object:");
	  	console.log("--------------------------------------------");
	  	console.log(users);
	  	console.log("--------------------------------------------");

  	}

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

// });

// from: http://stackoverflow.com/a/2532251
function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function checkIfUrlAvailable(IDtoAvoid, callback){
	var urlsAvailable = false;
	for(userID in users){
		if(userID != IDtoAvoid && users[userID].numSitesAvailable > 0){
			for(site in users[userID].websitesFromUser){
				if(users[userID].websitesFromUser[site] == 1 && !(site in users[IDtoAvoid].websitesToUser)){
					urlsAvailable = true;
					console.log('in checkIfUrlAvailable and it\'s true');
					break;
				}
			}
		}
	}
	callback(urlsAvailable);

}


function getSurpriseUrl(IDtoAvoid, callback){
	checkIfUrlAvailable(IDtoAvoid, function(urlsAvailable){
		if(urlsAvailable){

			if (users[IDtoAvoid].numSurprised == 0){
				console.log('in checkforURLSAvaileble callback and its true, FIRST SURPIRSE!');
				var url_picked = "";
				var IDpickedFrom = IDtoAvoid;
				
				while(IDpickedFrom == IDtoAvoid || url_picked == ""){
					IDpickedFrom = pickRandomProperty(users);
					url_picked = pickRandomProperty(users[IDpickedFrom].websitesFromUser);
					console.log('in while loop idPicked: ' + IDpickedFrom + " url: " + url_picked);
				}

			}else{
				console.log('in checkforURLSAvaileble callback and its true, WAS SURPRISED alread');
				var url_picked = pickRandomProperty(users[IDtoAvoid].websitesToUser);
				var IDpickedFrom = IDtoAvoid;
				
				while(IDpickedFrom == IDtoAvoid || (url_picked in users[IDtoAvoid].websitesToUser)){
					IDpickedFrom = pickRandomProperty(users);
					url_picked = pickRandomProperty(users[IDpickedFrom].websitesFromUser);
					console.log('in while loop idPicked: ' + IDpickedFrom + " url: " + url_picked);
				}	
			}

			var selectedURL = url_picked;
			users[IDpickedFrom].websitesFromUser[selectedURL] = 0;
			users[IDpickedFrom].numSitesAvailable -= 1;
			console.log('in the checkforUrls callback and sendng this url: ' + selectedURL);

			users[IDtoAvoid].numSurprised += 1;

			callback(selectedURL);
			

		}else{
			console.log('would like to return a surpirse url, but none is available from other users.');
			callback("");
		}
	});	
}


app.get('/getNewUrl', function (req, res) {
	var URLtoSend = "";
	var clientID = req.query.sendID;

	console.log('Client with id ' + clientID + ' asked for a URL.')
	// check if client is in users already and also check the time
	var currentTime = new Date().getTime() / 1000;	
	if(clientID in users){
		// console.log(users[clientID]);
 		//check the time
 		if(currentTime - users[clientID].timeLastSurprise >= browserSurpriseInterval){
 			//send a surprise website back if there are any available:
 			// URLtoSend = "http://www.artdelicorp.com/img2/browser-surprise.png####Browser-Surprise####";

 			getSurpriseUrl(clientID, function(url){
				URLtoSend = url;
				console.log('in getSurpriseUrl: the length is ' + URLtoSend.length);
 			});
 		}
  	}else{
  		users[clientID] = new User.create(clientID);
  		
  		getSurpriseUrl(clientID, function(url){
			URLtoSend = url;
		});
  		// URLtoSend = "http://www.artdelicorp.com/img2/browser-surprise.png####Browser-Surprise####";

  		
  	}


  	if(URLtoSend.length > 0){
  		console.log('[+] sending this long url: ' + URLtoSend + " to client " + clientID);
 		users[clientID].timeLastSurprise = currentTime;
 		//also put it on the surpirse list of the user:
 		users[clientID].websitesToUser[URLtoSend] = 1;

 		var surpriseSuffix = "####Browser-Surprise####";
 		URLtoSend = URLtoSend + surpriseSuffix;
  	}
  	
    res.writeHead(200, {"Content-Type": "text/plain"});
    console.log(users);
    console.log('[+] sending this: ' + URLtoSend + " to client " + clientID);
    res.end(URLtoSend);

});




