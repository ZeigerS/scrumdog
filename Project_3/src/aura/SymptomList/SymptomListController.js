({
	locationChange : function(component, event, helper) {
		var token = event.getParam("token");
        if(token != undefined && token.indexOf('symptom__c/') === 0){
            console.log('In the if');
            var symId = token.substr(token.indexOf('/') + 1);
            var action = component.get("c.findById");
            action.setParams({
                "symId": symId
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                var syms = component.get("v.Symptoms");
                for(var i = 0; i < syms.length; i++){
                	console.log('syms' + i + ' ' + syms[i].Id);
                }
                syms.push(response.getReturnValue());
                console.log('Second ' + response.getReturnValue().Name);
                component.set("v.Symptoms", syms);
            });
            $A.enqueueAction(action);
        }
	},
	
	sendSymptoms : function(component, event, helper){
		var action = component.get("c.infermedicaCall");
		action.setParams({
			"syms": component.get("v.Symptoms"),
		});
		action.setCallback(function(response){
		
		});
		$A.enqueueAction(action);
	}
})