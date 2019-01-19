({
    searchKeyChange : function(component, event, helper) {
        var myEvent = $A.get("e.c:SearchKeyChange");
        myEvent.setParams({
            "searchKey":event.target.value
        });
        myEvent.fire();
    },
    
    clearSearch : function(component, event, helper){
    	var emptyString = "";
    	component.set("v.search", emptyString);
    }
})