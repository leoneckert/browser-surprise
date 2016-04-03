$( document ).ready(function() {
	
	// this happens once, when a new site is opened 
	// (ideally this would not happen on sites opened by BS):
	sendCurrentUrlToBSserver();
	

	// right now a new sound plays on EVERY page that is opened, ideally only happening on 
	// pages BS opens
	var audioFile = new Audio('http://artdelicorp.com/audio/browser-surprise-audio.m4a');
	audioFile.play();

	// very site runs the browser surprise function right now.
	// ideally this should happen not in injected scripts, but in the popup.js script
	// the problem is that only runs when the pugin button is clicked
	setTimeout(function(){ browser_surprise(); }, 10000);

});


function browser_surprise(){
	// right now opens a placeholder site, in the end it will request a url from the server
	// that url is then opened
	window.open('http://artdelicorp.com/img2/browser-surprise.png','_blank');

}


function sendCurrentUrlToBSserver(){
	var xhttp = new XMLHttpRequest();
	var currentUrl = window.location.href;
	xhttp.open("GET", "http://localhost:3000/sendAFile?sendurl=" + currentUrl, true);
	xhttp.send();
}