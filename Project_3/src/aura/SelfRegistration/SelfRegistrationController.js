({
	changeSex : function(component, event, helper) {
        component.set("v.userSex", component.find("sexPick").get("v.value"));
        console.log("userEmail: " + component.get("v.userEmail"));
        console.log("userBirthdate: " + component.get("v.userBirthdate"));
        console.log("userSex: " + component.get("v.userSex"));
	},
    
    //public static Boolean apexRegUser(String userSex, String userEmail, Date userBirthdate)
    //<aura:attribute type="String" name="userEmail" />
    //<aura:attribute type="Date" name="userBirthdate" />
    //<aura:attribute type="String" name="userSex" />
    registerUser : function(component, event, helper){
        //var action = component.get("c.newCaseDB");
        component.set("v.userSex", component.find("sexPick").get("v.value"));
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
                            
            }
            else
            {
                console.log("response = failure");
            }
            if(!serverResponse.getReturnValue())
            {
                console.log("error occured during account creation");
            }
        });
        
        $A.enqueueAction(serverCall);
    }
})