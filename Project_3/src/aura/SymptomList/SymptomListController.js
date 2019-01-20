({
	locationChange : function(component, event, helper) {
		var token = event.getParam("token");
        if(token != undefined && token.indexOf('symptom__c/') === 0){
            var symId = token.substr(token.indexOf('/') + 1);
            var action = component.get("c.findById");
            action.setParams({
                "symId": symId
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                var syms = component.get("v.Symptoms");
                var sym = response.getReturnValue();
                var sendSymEvent = $A.get("e.c:sendingSymptomEvent");
                sendSymEvent.setParams({
                	"removingSymptom":true,
                	"newSymptom":sym,
                });
                syms.push(sym);
                component.set("v.Symptoms", syms);
                sendSymEvent.fire();
            });
            $A.enqueueAction(action);
        }
	},
	
	sendSymptoms : function(component, event, helper){
		var action = component.get("c.infermedicaCall");
		action.setParams({
			"syms": component.get("v.Symptoms"),
			"con": component.get("v.currentContact"),
		});
		action.setCallback(this, function(response){
			console.log('response code ' + response.getState());
			console.log('response return value ' + response.getReturnValue());
            var responseBody = response.getReturnValue();
            console.log('responseBody: ' + responseBody);
            console.log('responseBody[0]: ' + responseBody[0]);
            var diagJun = responseBody;
            for(var i = 0; i < diagJun.length; i++){
            	console.log(i);
            	console.log('Diagnosis Junc likelihood: ' + diagJun[i].diagJuncObj.Likelihood__c);
            	console.log('Diagnosis Obj: ' + diagJun[i].diagObj.Name);
            }
            var sendSymEvent = component.getEvent("fromSearch");
			sendSymEvent.setParams({
				"symptomList":component.get("v.Symptoms"),
				"diagWrapperList":diagJun,
			});
			sendSymEvent.fire();
		});
		$A.enqueueAction(action);
	},
	
	removeSym : function(component, event, helper){
		console.log('in the remove symptom');
		var target = event.target;
		console.log(target.Name);
		var index = target.getAttribute("data-Index");
		console.log(index);
		var syms = component.get("v.Symptoms");
		var sym;
		for(var i = 0; i < syms.length; i++){
			if(i == index){
				sym = syms[i];
				var firstPart = syms.slice(0, index);
				var secondPart = syms.slice(index + 1, syms.length + 1);
				var ret = new Array();
				ret = firstPart.concat(secondPart);
				component.set("v.Symptoms", ret);
			}
		}
		if(sym){
			var sendSymEvent = $A.get("e.c:sendingSymptomEvent");
			sendSymEvent.setParams({
				"removingSymptom":false,
				"newSymptom":sym,
			});
			sendSymEvent.fire();
		}	
	}
})