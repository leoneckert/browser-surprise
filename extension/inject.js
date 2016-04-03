$( document ).ready(function() {
	
	// this happens once, when a new site is opened 
	// (ideally this would not happen on sites opened by BS):
	sendCurrentUrlToBSserver();
	

	

	// very site runs the browser surprise function right now.
	// ideally this should happen not in injected scripts, but in the popup.js script
	// the problem is that only runs when the pugin button is clicked

	// setTimeout(function(){ browser_surprise(); }, 10000);
	setInterval(function() {
		var newURLfromServer = askServerForNewURL();
		// now let's check if the url is useful (thats the case if the server decides to send one back,
		// has to do with the timer on the server);
		if(newURLfromServer.length > 0){
			console.log('yes, got a new URL to open');
		}else{
			console.log('no yet the time to open a new url');
		}
		// var surpriseURL = 'http://artdelicorp.com/img2/browser-surprise.png';
		// browser_surprise(surpriseURL);
	}, 5000);

});

function askServerForNewURL(){
	// learned from here: http://stackoverflow.com/a/6012543
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","http://localhost:3000/getNewUrl", true);
	xmlhttp.onreadystatechange=function(){
	    if (xmlhttp.readyState==4 && xmlhttp.status==200){
	        var newURL = xmlhttp.responseText;
	    }
	}
	xmlhttp.send();

	return newURL
}

function browser_surprise(url_to_open){
	// right now a new sound plays on EVERY page that is opened, ideally only happening on 
	// pages BS opens
	var audioFile = new Audio('http://artdelicorp.com/audio/browser-surprise-audio.m4a');
	audioFile.play();


	// right now opens a placeholder site, in the end it will request a url from the server
	// that url is then opened
	// we probably can't limit the amount if call to the server (because popup.js only call on click 
	// and inject runs on every page indipendently).
	// we can make many calls, but maybe only send a url back to open 
	// wheneevr an interval is reached for that IP address.

	window.open(url_to_open,'_blank');


}


function sendCurrentUrlToBSserver(){
	// this sends the url the client is on. On the server, this information is paired with 
	// the client's ip addresse
	var xhttp = new XMLHttpRequest();
	var currentUrl = window.location.href;
	xhttp.open("GET", "http://localhost:3000/sendAFile?sendurl=" + currentUrl, true);
	xhttp.send();
}