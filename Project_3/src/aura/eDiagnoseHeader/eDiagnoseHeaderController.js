({
	toggleCon : function(component, event, helper) {
		console.log("in JS");
	
		var curCon = component.get("v.currentContact");
		
		if(curCon == null)
		{
			console.log("contact is null");
			var serverCall = component.get("c.getAContact");
			
			serverCall.setCallback(this, function(response){
			console.log("entered callback");
				if(response.getState() === 'SUCCESS')
				{
					console.log("success");
					component.set("v.currentContact", response.getReturnValue());
				}
				else
				{
					console.log("failed");
				}
			});
			
			$A.enqueueAction(serverCall);
		}
		else
		{
			console.log("contact not null");
			component.set("v.currentContact", null);
		}
	},
	
	toggleLogin : function(component, event, helper){
		if(component.get("v.trueForLogin") === true)
		{
			component.set("v.trueForLogin",false);
		}
		else
		{
			component.set("v.trueForLogin",true);
		}
	},
	
	toggleRegister : function(component, event, helper){
		if(component.get("v.trueForRegister") === true)
		{
			component.set("v.trueForRegister",false);
		}
		else
		{
			component.set("v.trueForRegister",true);
		}
	
	}
})