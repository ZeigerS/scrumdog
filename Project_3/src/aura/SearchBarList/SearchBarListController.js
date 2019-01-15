({
	doInit : function(component, event, helper) {
		var action = component.get("c.findAll");
        action.setCallback(this, function(response){
            component.set("v.symptoms", response.getReturnValue());
        });
        $A.enqueueAction(action);
	},
    
    searchKeyChange : function(component, event, helper){
        var searchKey = event.getParam("searchKey");
        var action = component.get("c.findByName");
        action.setParams({
            "searchKey": searchKey
        });
        action.setCallback(this, function(response){
            component.set("v.symptoms", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
})