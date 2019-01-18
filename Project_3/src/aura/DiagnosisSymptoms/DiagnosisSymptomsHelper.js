({
	getSymptomsHelper : function(component, searchId) {
        // Prepare the call to the server.
        console.log('Called getSymptomsHelper.');
		let action = component.get("c.getSymptomNamesFromSearch");
        action.setParams({
            "searchId":searchId,
        });
        
        // Call the server.
        action.setCallback(this, function(response) {
            console.log('Server-side call started.');
            let state = response.getState();
            if (state === 'SUCCESS') {
                // Put the returned symptoms into the displayed page.
                let symptoms = response.getReturnValue();
                component.set('v.symptomsList', symptoms);
            } else {
                alert('Error');
            }
            console.log('Server-side call done.');
        });
        
        $A.enqueueAction(action);
        console.log('getSymptomsHelper done.');
	}
})