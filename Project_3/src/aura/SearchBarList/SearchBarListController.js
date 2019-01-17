({
	doInit : function(component, event, helper) {
		var action = component.get("c.findAll");
        action.setCallback(this, function(response){
            component.set("v.masterSymptoms", response.getReturnValue());
        });
        $A.enqueueAction(action); 
	},
    
    searchKeyChange : function(component, event, helper){
        var searchKey = event.getParam("searchKey");
        component.set("v.currentSymptoms", helper.getDisplaySymptom(component, searchKey));
    },
})