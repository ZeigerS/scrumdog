({
	doInit : function(component, event, helper) {
		var action = component.get("c.findAll");
        action.setCallback(this, function(response){
        console.log(response.getReturnValue());
            component.set("v.masterSymptoms",helper.removeOld(component, response.getReturnValue()));
        });
        $A.enqueueAction(action); 
	},
    
    searchKeyChange : function(component, event, helper){
        var searchKey = event.getParam("searchKey");
        component.set("v.currentSymptoms", helper.getDisplaySymptom(component, searchKey));
    },
    
    changeList : function(component, event, helper){
    	if(event.getParam("removingSymptom")){
    		helper.removeSymptom(component, event.getParam("newSymptom"));
    	}
    	else{
    		helper.addSymptom(component, event.getParam("newSymptom"));
    	}
    },
})