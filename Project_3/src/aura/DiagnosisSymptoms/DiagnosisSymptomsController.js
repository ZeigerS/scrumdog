({
	getSymptomNames : function(component, event, helper) {
        let searchId = component.get('v.searchRecord');
		helper.getSymptomsHelper(component, searchId);
	},
})