({
	sendToSearch : function(component, event) {
        var symList = component.get("v.symptomList");
        
        var compEvent = component.getEvent("fromDiagnosis");
        
        compEvent.setParams({
            symptomList : symList
        });
        
        compEvent.fire();
	}
})