
$( document ).ready(function() {
	var xhttp = new XMLHttpRequest();
	var currentUrl = window.location.href;
	xhttp.open("GET", "http://localhost:3000/sendAFile?sendurl=" + currentUrl, true);
	xhttp.send()

	console.log(currentUrl);
	console.log('injecting works');


	var audioFile = new Audio('http://artdelicorp.com/audio/browser-surprise-audio.m4a');
	audioFile.play();

	setTimeout(function(){ browser_surprise(); }, 10000);

});


function browser_surprise(){

	window.open('http://artdelicorp.com/img2/browser-surprise.png','_blank');

	//i too made a comment (leon)

	//i made a comment


}
