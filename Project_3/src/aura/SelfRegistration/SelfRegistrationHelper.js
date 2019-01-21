({
	regUser : function(component, event) {
	    //component.set("v.userSex", component.find("sexPick").get("v.value"));
        var serverCall = component.get("c.apexRegUser");
        
        serverCall.setParams({
            "userSex" : component.get("v.userSex"),
            "userEmail" : component.get("v.userEmail"),
            "userBirthdate" : component.get("v.userBirthdate")
        });
        
        serverCall.setCallback(this, function(serverResponse){
           
            if(component.isValid() && serverResponse.getState() === "SUCCESS")
            {
                console.log("Creation Success");
                
                    /*
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                    "componentDef" : "c:AccListComponent",
                    "componentAttributes":{
                        "accList":resp.getReturnvalue();
                    }
                    });
            		evt.fire();
                    */
                    
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Account Created",
                    "message": "an email was sent to complete registration",
                    "type" : "success"
                });
                resultsToast.fire();
                
                this.closeModal(component, event);            
            }
            else
            {
                console.log("response = failure");
            }
            if(!serverResponse.getReturnValue())
            {
                console.log("error occured during account creation");
                
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Error",
                    "message": "Entered data not valid or username already exists",
                    "type" : "error"
                });
                resultsToast.fire();
            }
        });
        
        $A.enqueueAction(serverCall);
	},
	
	chkValid : function(component){
		console.log("in helper");
		component.set("v.userSex", component.find("sexPick").get("v.value"));
		var userEmail = component.get("v.userEmail");
        var userBD = component.get("v.userBirthdate");
        var userSex = component.get("v.userSex");
        
        if((userEmail.length > 7) && userBD && userSex)
        {
        	console.log("set to false");
        	component.set("v.disableBool", false);
        }
        else
        {
        	console.log("set to true");
        	component.set("v.disableBool", true);
        }
	},
	
	closeModal : function(component, event){
		var myEvent = component.getEvent("toggleSelfRegister");
		
		myEvent.fire();
	}
})