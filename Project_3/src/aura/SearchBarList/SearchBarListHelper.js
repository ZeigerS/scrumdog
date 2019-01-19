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
			if(((index === 0 || array[index-1].Name < target) && array[index].Name > target) || array[index].Name == target){
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
	},
	
	removeSymptom : function(component, sym){
		var master = component.get("v.masterSymptoms");
		var index = this.getStartIndex(master, sym.Name);
		var firstPart = master.slice(0, index);
		var secondPart = master.slice(index + 1, master.length + 1);
		var ret = new Array();
		ret = firstPart.concat(secondPart);
		component.set("v.masterSymptoms", ret);
		var retList = new Array();
		component.set("v.currentSymptoms", retList);
	},
	
	addSymptom: function(component, sym){
		var master = component.get("v.masterSymptoms");
		var index = this.getStartIndex(master, sym.Name);
		var firstPartMaster = master.slice(0, index);
		var secondPartMaster = master.slice(index, master.length + 1);
		firstPartMaster.push(sym);
		var retMaster = new Array();
		retMaster = firstPartMaster.concat(secondPartMaster);
		component.set("v.masterSymptoms", retMaster);
		master = component.get("v.masterSymptoms");
	},
})