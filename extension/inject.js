// unique hash - stackoverflow guid()
// chrome.storage
// check if in there, if not generate new one


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

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function alreadyHaveID(){
	chrome.storage.local.get('value', function (items){
		if(items['key'] == null){
			console.log('does not have a unique ID yet');
			console.log('but could be this: ' + guid());
			console.log('or this: ' + guid());
			console.log('or this: ' + guid());
			console.log('or this: ' + guid());
			
			return false;
		}else if(items['key']){
			console.log('has a unique ID already');
			return true;
		}

	}); 
}

function getUniqueID(){
	if(!alreadyHaveID()){
		// make an ID
		console.log('does not have a unique ID yet indeed');

	}else{
		// take ID that exists already
		console.log('has a unique ID already indeed');
	}
	return "";
}

function sendCurrentUrlToBSserver(){

	var myID = getUniqueID();

	// chrome.storage.local.set({'value': ""}, function() {
      // Notify that we saved.
      // alert('Settings saved');
      // console.log(chrome.storage.local.get('value', function (items){return items['value'];});
  //     chrome.storage.local.get('value', function (items){
		// console.log('here is what is in storage' + items['value']);
		// });

 //    chrome.storage.local.get('value', function (items){
	// 	console.log('here is what is in storage' + items['key']);
		
	// 	if(items['key'] == null){
	// 		console.log('its underfinde hey its spelled wrong');
	// 	}
	// });

    // });

	

	var xhttp = new XMLHttpRequest();
	var currentUrl = window.location.href; 
	var currentHost = window.location.hostname; 
	if (currentHost.slice(0, 4) == "www."){
		currentHost = currentHost.slice(4, currentHost.length)
	}
	xhttp.open("GET", "http://" + serverIP + ":3000/sendAFile?sendurl=" + currentUrl + "&sendhost=" + currentHost, true);
	xhttp.send();
}




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


