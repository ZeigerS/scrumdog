({
	getsymptomQuery : function(component) {
    var action = component.get("c.symptomQuery");
        action.setCallback(this, function(response){
            if (response.getState()==="SUCCESS") {
                component.set("v.symList", response.getReturnValue());
            } 
        });
        $A.enqueueAction(action); 
	}
})