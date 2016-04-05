// module.exports = {
// 	//   __                  _   _                 
// 	//  / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
// 	// | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
// 	// |  _| |_| | | | | (__| |_| | (_) | | | \__ \
// 	// |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

// 	function urlOtherThanClients(clientsIP){
// 		for(ip in sitesByUser){
// 			for(site in sitesByUser[ip]){
// 				if(site){
// 					if(ip != clientsIP){
// 						return true;
// 					}
// 				}
// 			}
// 		}
// 		return false;
// 	}

// 	// from: http://stackoverflow.com/a/2532251
// 	function pickRandomProperty(obj) {
// 	    var result;
// 	    var count = 0;
// 	    for (var prop in obj)
// 	        if (Math.random() < 1/++count)
// 	           result = prop;
// 	    return result;
// 	}

// 	var surpriseRecordByUser = {}

// 	function randomUrlFromOtherClient(clientsIP){
// 		var ranUrl = "";
// 		var ranHost = "";
// 		var ipAssociated = clientsIP;
// 		var hadThisAlready = true;

// 		while(ranUrl == "" && ipAssociated == clientsIP && hadThisAlready == true){

// 			hadThisAlready = false;
// 			ipAssociated = pickRandomProperty(sitesByUser);
// 			console.log('picked this ip: ' + ipAssociated);
// 			ranUrl = pickRandomProperty(sitesByUser[ipAssociated]);
// 			ranHost = sitesByUser[ipAssociated][ranUrl];
// 			console.log('this is the host: ' + ranHost + " that gets packed into the object");
// 			console.log('picked this site: ' + ranUrl);
			

// 			for(site in surpriseRecordByUser[clientsIP]){
// 				if(surpriseRecordByUser[clientsIP][site] == ranHost){
// 					hadThisAlready = true;
// 				}
// 			}

// 		}
// 		var urlIPpair = [];
// 		urlIPpair.push(ranUrl);
// 		urlIPpair.push(ipAssociated);
// 		urlIPpair.push(ranHost);
// 		console.log('created this pack: ' + urlIPpair);
// 		return urlIPpair;
// 	}


















// };