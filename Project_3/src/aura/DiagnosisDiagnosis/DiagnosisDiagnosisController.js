({
	testData : function(component, event, helper) 
    {
        var action = component.get('c.getWrapperObject');
        action.setParams({
            "likely" : [10, 35, 27.32],
            "diagName" : ["Diagnosis1", "Diagnosis2", "Diagnosis3"]
        });
 
      action.setCallback(this, function(response) {
        //store state of response
        var state = response.getState();
        if (state === "SUCCESS") {
          //set response value in wrapperList attribute on component.
          component.set('v.diagList', response.getReturnValue());
        }
      });
      $A.enqueueAction(action);
        
	}
})