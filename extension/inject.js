$( document ).ready(function() {
	
	// this happens once, when a new site is opened 
	// (ideally this would not happen on sites opened by BS):
	sendCurrentUrlToBSserver();
	

	

	// very site runs the browser surprise function right now.
	// ideally this should happen not in injected scripts, but in the popup.js script
	// the problem is that only runs when the pugin button is clicked

	// setTimeout(function(){ browser_surprise(); }, 10000);
	setInterval(function() {
		browser_surprise();
	}, 5000);

});


function browser_surprise(){
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

	window.open('http://artdelicorp.com/img2/browser-surprise.png','_blank');


}


function sendCurrentUrlToBSserver(){
	// this sends the url the client is on. On the server, this information is paired with 
	// the client's ip addresse
	var xhttp = new XMLHttpRequest();
	var currentUrl = window.location.href;
	xhttp.open("GET", "http://localhost:3000/sendAFile?sendurl=" + currentUrl, true);
	xhttp.send();
}