
$(document).ready(function(){
	var params = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(params, function(tabs){
		var tab = tabs[0];

		var url = tab.url;
		console.log(url);
		// here we send the url to the server
	});

	//make a new window pop up here probably in inject
	// window.open('http://leoneckert.com/','_blank');
	// window.open('http://leoneckert.com/','_blank');
	// window.open('http://leoneckert.com/','_blank');
	// window.open('http://leoneckert.com/','_blank');
	


});