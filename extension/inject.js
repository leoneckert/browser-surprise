
$( document ).ready(function() {
	var xhttp = new XMLHttpRequest();
	var currentUrl = window.location.href;
	console.log(currentUrl);
	console.log('injecting works');


	var audioFile = new Audio('http://artdelicorp.com/audio/browser-surprise-audio.m4a');
	audioFile.play();

	setTimeout(function(){ browser_surprise(); }, 3000);

});


function browser_surprise(){

	window.open('http://leoneckert.com/','_blank');
	//i too made a comment (leon)

}
