// var serverIP = "172.16.250.215:3000"

var serverIP = "browser-surprise.herokuapp.com"

// var serverIP = "localhost"
$( document ).ready(function() {
	
	playSoundIfBrowserSurprise();

	// could ad a function that only triggers to send the url when remaining on a page for some minutes 
	// (this avoud sending stuff that is opened in between)
	// e.g. when I go on youtube.com to watch a video, what should be shared is the page of the video,
	// not the plain youtube.com page AND the page of the video.
	oldURL = window.location.href;
	// on another note, we should send the tab whenever the url changes, thing like youtube or facebook
	// dont trigger a new document (which what cause inject.js to run)
	sendCurrentUrlToBSserver(function(myID){	
		// console.log('unique ID on the CLIENT SIDE IS AFTER SENDING THE TAB: ' + myID);
		setInterval(function() {
			askForBrowserSurprise(myID);
		}, 10000);
		setInterval(function() {
			checkURLchange(window.location.href);
		}, 1000);
	});

});

var oldURL = "";
function checkURLchange(currentURL){
	if(currentURL != oldURL){
		sendCurrentUrlToBSserver();
		oldURL = currentURL;
	}
}


function askForBrowserSurprise(myID){
	askServerForNewURL(myID, function(url){

		if(url.length > 0){
			
			console.log('[+] Received new URL from server.');
			console.log('\turl received: ' + url);
			console.log('\t...opening now:');
			
			browser_surprise(url);
		}
	});
}


function askServerForNewURL(ID, callback){
	var newURL;
	// learned from here: http://stackoverflow.com/a/6012543
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","https://" + serverIP + "/getNewUrl?sendID=" + ID, true);
	xmlhttp.onreadystatechange=function(){
	    if (xmlhttp.readyState==4 && xmlhttp.status==200){
	        newURL = String(xmlhttp.responseText);
	        callback(newURL);
	    }
	}
	xmlhttp.send();
	// console.log('received this: ' + newURL);
	// callback(newURL);
}

function browser_surprise(url_to_open){
	console.log('opening literally this: ' + url_to_open);
	window.open(url_to_open,'_blank');
}


