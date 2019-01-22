({
	closeModel : function(component, event, helper) {
		var myEvent = component.getEvent("toggleProfile");
		myEvent.fire();
	},
})