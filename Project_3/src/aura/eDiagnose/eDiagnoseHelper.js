({
	sendToSearch : function(component, event) {        
        component.set("v.symptomList", event.getParam("symptomList"));
        
        component.set("v.trueForSearch", true);
	},
	
	sendToDiagnosis : function(component, event) {
		component.set("v.symptomList", event.getParam("symptomList"));
		component.set("v.diagWrapperList", event.getParam("diagWrapperList"));
		
		component.set("v.trueForSearch", false);
	},
	
	doInit : function(component, event){
		var serverCall = component.get("c.getUserContact");
		
		serverCall.setCallback(this, function(response){
			if(component.isValid() && response.getState() === 'SUCCESS')
			{
				component.set("v.currentContact", response.getReturnValue());
				console.log("Parent" + component.get("v.currentContact"));
				
				component.set("v.renderButtons", true);
			}
		});
		
		$A.enqueueAction(serverCall);
	}
})