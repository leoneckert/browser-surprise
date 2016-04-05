var audioFiles = [
    'http://artdelicorp.com/audio/bs-00.m4a',
    'http://artdelicorp.com/audio/bs-01.mp3',
    'http://artdelicorp.com/audio/bs-02.mp3',
    'http://artdelicorp.com/audio/bs-03.mp3',
    'http://artdelicorp.com/audio/bs-04.mp3',
    'http://artdelicorp.com/audio/bs-05.mp3'
];

var randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];


function playSoundIfBrowserSurprise(){
	var currentUrl = window.location.href;
	if (currentUrl.length > 24){
		var endOfURL = currentUrl.slice(currentUrl.length - 24, currentUrl.length);
		console.log("endOfURL");
		if(endOfURL == "####Browser-Surprise####"){
			var audioFile = new Audio(randomAudio);
			audioFile.play();
		}
	}
