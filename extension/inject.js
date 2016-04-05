// var serverIP = "172.16.255.74"

var serverIP = "localhost"
var newURL = "";
$( document ).ready(function() {
	
	sendCurrentUrlToBSserver();

	// playSoundIfBrowserSurprise();

	// var timeLastAction = new Date().getTime() / 1000;
	
	// setInterval(function() {
	// 	askServerForNewURL();
	// 	// now let's check if the url is useful (thats the case if the server decides to send one back,
	// 	// has to do with the timer on the server);
	// 	if(newURL.length > 0){
	// 		var currentTime = new Date().getTime() / 1000;
	// 		var timeInterval = currentTime - timeLastAction;
	// 		timeLastAction = currentTime;
	// 		console.log('[+] Received new URL from server. ' + timeInterval + " seconds since the last surprise.");
	// 		console.log('\turl received: ' + newURL);
	// 		console.log('\t...opening now:');
			
	// 		browser_surprise(newURL);
	// 	}
	// }, 1000);

});



function playSoundIfBrowserSurprise(){
	var currentUrl = window.location.href;
	if (currentUrl.length > 24){
		var endOfURL = currentUrl.slice(currentUrl.length - 24, currentUrl.length);
		console.log("endOfURL");
		if(endOfURL == "####Browser-Surprise####"){
			var audioFile = new Audio('http://artdelicorp.com/audio/browser-surprise-audio.m4a');
			audioFile.play();
		}
	}
}

function askServerForNewURL(){
	// learned from here: http://stackoverflow.com/a/6012543
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","http://" + serverIP + ":3000/getNewUrl", true);
	xmlhttp.onreadystatechange=function(){
	    if (xmlhttp.readyState==4 && xmlhttp.status==200){
	        newURL = String(xmlhttp.responseText);
	    }
	}
	xmlhttp.send();
}

function browser_surprise(url_to_open){
	window.open(url_to_open,'_blank');
}


