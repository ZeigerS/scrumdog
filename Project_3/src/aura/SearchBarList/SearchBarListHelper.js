({
	getDisplaySymptom : function(component, searchKey) {
		var retList = new Array();
		if(!searchKey){
			return retList;
		}
        retList = component.get("v.masterSymptoms");
        var search = searchKey.charAt(0).toUpperCase() + searchKey.slice(1);
		var startIndex = this.getStartIndex(retList, search);
		var tempList = new Array();
        if(startIndex === -1){
            return tempList;
        }
        console.log('retList: ' + retList);
		for(var i = startIndex; i < (startIndex + 5); i++){
            if(retList[i].Name.includes(search)){
				tempList.push(retList[i]);                
            }
		}
		retList = tempList;
		return retList;
	},
	
	getStartIndex : function(array, target){
		var L = 0;
		var R = array.length - 1;
		while(L <= R){
			var index = Math.floor((L + R) / 2);
			if((index === 0 || array[index-1].Name < target) && array[index].Name > target){
				return index; 
			}
			else if(array[index].Name < target){
				L = index + 1;
			}
			else{
				R = index - 1;
			}
		}
		return -1;
	}
})