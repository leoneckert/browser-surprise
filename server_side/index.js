//leoneckert and melaniehoff
var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 5000));
// var http = require('http').Server(app);



var User = require('./User.js');
var browserSurpriseInterval = 10; //in seconds


// var bs = require('./functions.js');
// Start server listening on port 3000
// app.listen(3000, function () {
//   console.log('Browser Surprise listening on https://browser-surprise.herokuapp.com/');
// });
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
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
  	if(clientID != null){
  		var printInfo = true;
	  	//check if user is in users already
	  	if(clientID in users){
	  		if(users[clientID].websitesFromUser[siteURL] == 1){
	  			printInfo = false; 
	  			// this is just because below sometimes prionted twice 
	  			// when the browser internally refreshes. <3 pretty printing.
	  		}
	  		users[clientID].ADDwebsiteFromUser(siteURL);
	  	}else{
	  		users[clientID] = new User.create(clientID);
	  		users[clientID].ADDwebsiteFromUser(siteURL);
	  	}
	  	
	  	if(printInfo){
		  	console.log("[ NEW URL ] user " + clientID + " just visited: '" + siteURL + "' ]");
		  	// console.log("[ UPDATED USER ]");
		  	// console.log(users[clientID]);
		  	// console.log("____________");
		}
	  	
  	}
});



//                     _              _ 
//  ___  ___ _ __   __| |  _   _ _ __| |
// / __|/ _ \ '_ \ / _` | | | | | '__| |
// \__ \  __/ | | | (_| | | |_| | |  | |
// |___/\___|_| |_|\__,_|  \__,_|_|  |_|
                                     
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
		// if(userID != IDtoAvoid && users[userID].numSitesAvailable > 0){
		if(userID != IDtoAvoid){
			for(site in users[userID].websitesFromUser){
				if(users[userID].websitesFromUser[site] == 1 && !(site in users[IDtoAvoid].websitesToUser) && !(site in users[IDtoAvoid].websitesFromUser)){
					urlsAvailable = true;
					break;
				}
			}
		}
	}
	callback(urlsAvailable);
}


function getSurpriseUrl(IDtoAvoid, currenttime, callback){
	checkIfUrlAvailable(IDtoAvoid, function(urlsAvailable){
		if(urlsAvailable){
			users[IDtoAvoid].availabilityMessageShown = false;

			// if (users[IDtoAvoid].numSurprised == 0){
			// 	// IF ITs THE FIRST SURPRISE:
			// 	var url_picked = "";
			// 	var IDpickedFrom = IDtoAvoid;
			// 	while(IDpickedFrom == IDtoAvoid || url_picked == "" || (url_picked in users[IDtoAvoid].websitesFromUser) ){
			// 		IDpickedFrom = pickRandomProperty(users);
			// 		url_picked = pickRandomProperty(users[IDpickedFrom].websitesFromUser);
			// 	}
			// }else{
			// 	// FURTHER SURPRISES:
			// 	var url_picked = pickRandomProperty(users[IDtoAvoid].websitesToUser);
			// 	var IDpickedFrom = IDtoAvoid;
				
			// 	while(IDpickedFrom == IDtoAvoid || (url_picked in users[IDtoAvoid].websitesToUser) || (url_picked in users[IDtoAvoid].websitesFromUser)){
			// 		IDpickedFrom = pickRandomProperty(users);
			// 		url_picked = pickRandomProperty(users[IDpickedFrom].websitesFromUser);
			// 	}	
			// }


			var url_picked = "";
			var IDpickedFrom = IDtoAvoid;
			while(IDpickedFrom == IDtoAvoid || url_picked == "" || (url_picked in users[IDtoAvoid].websitesToUser)  || (url_picked in users[IDtoAvoid].websitesFromUser) ){
				// console.log('in while loop');
				IDpickedFrom = pickRandomProperty(users);
				url_picked = pickRandomProperty(users[IDpickedFrom].websitesFromUser);
			}
			

			var selectedURL = url_picked;
			users[IDpickedFrom].websitesFromUser[selectedURL] = 0;
			// users[IDpickedFrom].numSitesAvailable -= 1;

			users[IDtoAvoid].numSurprised += 1;
	 		users[IDtoAvoid].timeLastSurprise = currenttime;
	 		users[IDtoAvoid].websitesToUser[selectedURL] = 1;

	 		console.log('[ SENDING SURPRISE ! ] user ' + IDtoAvoid + " gets " + selectedURL);
	 		// console.log("[ UPDATED USER >>FROM<< ]");
	  	// 	console.log(users[IDpickedFrom]);
	  	// 	console.log("[ UPDATED USER >>TO<< ]");
	  	// 	console.log(users[IDtoAvoid]);
	  	// 	console.log("____________");

			callback(selectedURL);
			

		}else{
			if(!users[IDtoAvoid].availabilityMessageShown){
				console.log('[ No Surprise Available ] for user ' + IDtoAvoid);
				// console.log("____________");
				users[IDtoAvoid].availabilityMessageShown = true;
			}
			callback("");
		}
	});	
}


app.get('/getNewUrl', function (req, res) {
	var URLtoSend = "";
	var clientID = req.query.sendID;

	// console.log('Client with id ' + clientID + ' asked for a URL.')
	// check if client is in users already and also check the time
	var currentTime = new Date().getTime() / 1000;	
	if(clientID in users){
		// console.log(users[clientID]);
 		//check the time
 		if(currentTime - users[clientID].timeLastSurprise >= browserSurpriseInterval){
 			//send a surprise website back if there are any available:
 			// URLtoSend = "http://www.artdelicorp.com/img2/browser-surprise.png####Browser-Surprise####";

 			getSurpriseUrl(clientID, currentTime, function(url){
				URLtoSend = url;
 			});
 		}
  	}else{
  		users[clientID] = new User.create(clientID);
  		
  		getSurpriseUrl(clientID, currentTime, function(url){
			URLtoSend = url;
		});  		
  	}


  	if(URLtoSend.length > 0){
  	// 	console.log('[ SENDING SURPRISE ! ] user ' + clientID + " gets " + URLtoSend);
 		// users[clientID].timeLastSurprise = currentTime;
 		// users[clientID].websitesToUser[URLtoSend] = 1;


 		var surpriseSuffix = "#Browser-Surprise";
 		URLtoSend = URLtoSend + surpriseSuffix;
  	}
  	
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(URLtoSend);

});





