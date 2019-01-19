({
	myClickEvent : function(component, event) {
	
		var modalBool = component.get("v.trueToModal");
		
		
	},
	
	updateChosen : function(component){
	  //var action = component.get('c.getWrapperObject');
      //  action.setParams({
      //      "likely" : [10, 35, 27.32],
      //      "diagName" : ["Diagnosis1", "Diagnosis2", "Diagnosis3"]
      //  });
 
      //action.setCallback(this, function(response) {
        //store state of response
      //  var state = response.getState();
      //  if (state === "SUCCESS") {
      //    //set response value in wrapperList attribute on component.
      //    component.set('v.diagList', response.getReturnValue());
      //  }
      //});
      //$A.enqueueAction(action);
	
	
		var upRecord = component.get("v.wrapperObject.diagJuncObj");
		
		if(!upRecord.Chosen__c)
		{
			upRecord.Chosen__c = true;
			
			var serverCall = component.get("c.setToChosen");
			
			serverCall.setParams({
				"myJuncObj" : upRecord
			});
			
			serverCall.setCallback(this, function(serverResponse){
				if(serverResponse.getState() === 'SUCCESS')
				{
					console.log('Success');
				}
				if(serverResponse.getReturnValue())
				{
					console.log('updated successfully')
				}
				else
				{
					console.log('update failed')
				}
			});
			
			$A.enqueueAction(serverCall);
		}
		
		
		
	}
})