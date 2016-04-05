var User = function(uniqueID){ 
	this.uid = uniqueID;
	this.websitesFromUser = {};
	this.numSitesAvailable = 0;
}

User.prototype.ADDwebsiteFromUser = function(url){
	if(this.websitesFromUser[url] == 0){
		this.websitesFromUser[url] = 1;
		this.numSitesAvailable += 1;
	}else if(this.websitesFromUser[url] == 1){
		this.websitesFromUser[url] = 1;
	}else{
		this.websitesFromUser[url] = 1;
		this.numSitesAvailable += 1;
	}

}

module.exports = {
	create:function(data){
		return new User(data);
	}
};