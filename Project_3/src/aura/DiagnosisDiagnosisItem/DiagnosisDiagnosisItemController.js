({
	myClickEvent : function(component, event, helper) {
		//helper.myClickEvent(component, event);
		
		component.set("v.trueToModal", true);
	},
	
	closeModal : function(component, event, helper){
		component.set("v.trueToModal", false);
	}, 
	
	updateChosen : function(component, event, helper){
		helper.updateChosen(component);
	}
	
})