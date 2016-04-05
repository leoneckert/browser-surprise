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