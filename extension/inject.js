// var serverIP = "172.16.255.74"

var serverIP = "localhost"
$( document ).ready(function() {
	
	playSoundIfBrowserSurprise();

	sendCurrentUrlToBSserver(function(myID){
		
		// console.log('unique ID on the CLIENT SIDE IS AFTER SENDING THE TAB: ' + myID);

		var timeLastAction = new Date().getTime() / 1000;
	
		setInterval(function() {
			askForBrowserSurprise(timeLastAction, myID);
		}, 1000);

	});

});


function askForBrowserSurprise(time, myID){
	askServerForNewURL(myID, function(url){

		console.log('i got this from the server: ' + url);


	});

	// now let's check if the url is useful (thats the case if the server decides to send one back,
	// has to do with the timer on the server);
	

	// if(newURL.length > 0){
	// 	var currentTime = new Date().getTime() / 1000;
	// 	var timeInterval = currentTime - timeLastAction;
	// 	timeLastAction = currentTime;
	// 	console.log('[+] Received new URL from server. ' + timeInterval + " seconds since the last surprise.");
	// 	console.log('\turl received: ' + newURL);
	// 	console.log('\t...opening now:');
		
	// 	browser_surprise(newURL);
	// }
}


function askServerForNewURL(ID, callback){
	var newURL;
	// learned from here: http://stackoverflow.com/a/6012543
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","http://" + serverIP + ":3000/getNewUrl?sendID=" + ID, true);
	xmlhttp.onreadystatechange=function(){
	    if (xmlhttp.readyState==4 && xmlhttp.status==200){
	        newURL = String(xmlhttp.responseText);
	        console.log('just got this: ' + newURL);
	        callback(newURL);
	    }
	}
	xmlhttp.send();
	// console.log('received this: ' + newURL);
	// callback(newURL);
}

function browser_surprise(url_to_open){
	window.open(url_to_open,'_blank');
}


