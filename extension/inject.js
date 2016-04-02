
$( document ).ready(function() {
	var xhttp = new XMLHttpRequest();
	var currentUrl = window.location.href;
	console.log(currentUrl);
	console.log('injecting works');

	setTimeout(function(){ browser_surprise(); }, 10000);
});


function browser_surprise(){
	// we need to pull the url from the server that should be opened
	window.open('http://localhost:3000','_blank');
}
