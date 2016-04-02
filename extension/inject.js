
$( document ).ready(function() {
	console.log('injecting works');

	setTimeout(function(){ browser_surprise(); }, 3000);
});


function browser_surprise(){
	var audioFile = new Audio('browser_surprise.m4a');
	audio.play()

	window.open('http://leoneckert.com/','_blank');
}
