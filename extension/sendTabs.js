// from here: http://stackoverflow.com/a/105074
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function alreadyHaveID(callback){
	chrome.storage.local.get('uniqueKey', function (items){
		console.log("alreadyHaveID " + items['uniqueKey']);
		if(items['uniqueKey'] == null){ 
			callback(false);
		}else if(items['uniqueKey']){ 
			callback(true);
		}
	}); 
}

function getUniqueID(callback){

	alreadyHaveID(function(bool){
		if(!bool){
			// make an ID:
			console.log('[-] Browser does not have a unique ID yet.');
			var uid = guid();
			chrome.storage.local.set({'uniqueKey': uid}, function() {
	      		// Notify that we saved.
		      	console.log('[+] Created new unique ID: ' + uid + " for this browser.");
				callback(uid);
			});
		}else{
			// take ID that exists already:
		 	chrome.storage.local.get('uniqueKey', function (items){
		 		var uid = items['uniqueKey'];
		 		console.log('[-] Browser has unique ID already.');
				console.log('[+] Browser\'s unique ID: ' + uid);
				callback(uid);
			});
		}
	});

}

// http://localhost:3000/sendAFile?sendurl=http://leoneckert.com/&sendID=111111111

// http://localhost:3000/sendAFile?sendurl=http://www.nytimes.com/&sendID=222222222

// http://localhost:3000/sendAFile?sendurl=http://www.tagesschau.de/&sendID=222222222


// http://localhost:3000/sendAFile?sendurl=http://www.sport1.de/&sendID=33333333

function sendCurrentUrlToBSserver(callback){
	getUniqueID(function(value){
		var xhttp = new XMLHttpRequest();
		
		var currentUrl = window.location.href; 
		var myID = value;

		if(currentUrl.length > 24){
			var endOfURL = currentUrl.slice(currentUrl.length - 18, currentUrl.length);
			if(endOfURL == "##Browser-Surprise"){
				currentUrl = currentUrl.slice(0, currentUrl.length - 18);
			}

		}

		console.log('[+] sending my current url ' + currentUrl + ' to the server now.')
		xhttp.open("GET", "http://" + serverIP + ":3000/sendAFile?sendurl=" + currentUrl + "&sendID=" + myID, true);
		xhttp.send();
		callback(myID);
	});

}