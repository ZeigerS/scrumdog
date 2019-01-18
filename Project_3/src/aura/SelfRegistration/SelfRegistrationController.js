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
        
        helper.regUser(component);
        
        
    },
    
    checkValid : function(component, event, helper){
    	console.log("userEmail: " + component.get("v.userEmail"));
        console.log("userBirthdate: " + component.get("v.userBirthdate"));
        console.log("userSex: " + component.get("v.userSex"));
    	console.log("in controller");
    	helper.chkValid(component);
    }
})