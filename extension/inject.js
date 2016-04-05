// var serverIP = "172.16.255.74"

var serverIP = "localhost"
$( document ).ready(function() {
	
	playSoundIfBrowserSurprise();

	sendCurrentUrlToBSserver(function(myID){
		
		// console.log('unique ID on the CLIENT SIDE IS AFTER SENDING THE TAB: ' + myID);

		setInterval(function() {
			askForBrowserSurprise(myID);
		}, 1000);

	});

});


function askForBrowserSurprise(myID){
	askServerForNewURL(myID, function(url){

		// console.log('i got this from the server: ' + url);
		if(url.length > 0){
			
			console.log('[+] Received new URL from server.');
			console.log('\turl received: ' + url);
			console.log('\t...opening now:');
			
			browser_surprise(url);
		}
	});
}


function askServerForNewURL(ID, callback){
	var newURL;
	// learned from here: http://stackoverflow.com/a/6012543
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","http://" + serverIP + ":3000/getNewUrl?sendID=" + ID, true);
	xmlhttp.onreadystatechange=function(){
	    if (xmlhttp.readyState==4 && xmlhttp.status==200){
	        newURL = String(xmlhttp.responseText);
	        console.log('just got this: ' + newURL);
	        callback(newURL);
	    }
	}
	xmlhttp.send();
	// console.log('received this: ' + newURL);
	// callback(newURL);
}

function browser_surprise(url_to_open){
	window.open(url_to_open,'_blank');
}


