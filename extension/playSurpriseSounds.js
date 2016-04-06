var audioFiles = [
    'http://artdelicorp.com/audio/bs-00.m4a',
    'http://artdelicorp.com/audio/leon-00.m4a',
    'http://artdelicorp.com/audio/leon-01.mp3',
    'http://artdelicorp.com/audio/leon-02.mp3',
    'http://artdelicorp.com/audio/leon-03.mp3',
    'http://artdelicorp.com/audio/leon-04.mp3',
    'http://artdelicorp.com/audio/leon-05.mp3',
    'http://artdelicorp.com/audio/mel-00.m4a',
    'http://artdelicorp.com/audio/mel-01.mp3',
    'http://artdelicorp.com/audio/mel-02.mp3',
    'http://artdelicorp.com/audio/mel-03.mp3',
    'http://artdelicorp.com/audio/mel-04.mp3',
    'http://artdelicorp.com/audio/mel-05.mp3'
];

var randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];


function playSoundIfBrowserSurprise(){
	var currentUrl = window.location.href;
	if (currentUrl.length > 17){
		var endOfURL = currentUrl.slice(currentUrl.length - 17, currentUrl.length);
		if(endOfURL == "#Browser-Surprise"){
			var audioFile = new Audio(randomAudio);
			audioFile.play();
		}
	}
}

