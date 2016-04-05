var secondsBeforeSurpriseCycle = 20;

var User = function(uniqueID){ 
	this.uid = uniqueID;
	this.websitesFromUser = {};
	this.websitesToUser = {};
	this.numSitesAvailable = 0;
	this.numSurprised = 0;

	var currentTime = new Date().getTime() / 1000;	
	this.timeLastSurprise = currentTime + secondsBeforeSurpriseCycle;

	this.availabilityMessageShown = false;
}

User.prototype.ADDwebsiteFromUser = function(url){
	if(this.websitesFromUser[url] != 1){
		this.numSitesAvailable += 1;
	}
	this.websitesFromUser[url] = 1;
}

module.exports = {
	create:function(data){
		return new User(data);
	}
};