
$( document ).ready(function() {
	console.log('injecting works');

	setTimeout(function(){ browser_surprise(); }, 3000);
});


function browser_surprise(){
	window.open('http://leoneckert.com/','_blank');
}
