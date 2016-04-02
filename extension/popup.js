$(document).ready(function(){

	var params = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(params, function(tabs){
		var tab = tabs[0];
		console.log(tab.url);
		$('#status').text(tab.url);
	});

});