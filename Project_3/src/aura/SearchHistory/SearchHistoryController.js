({
	doInit : function(component, event, helper) {
		var action = component.get("c.getSearchHistory");
		action.setCallback(this, function(response){
			var megaWrapperList = response.getReturnValue();
			component.set("v.megaWrapperList", megaWrapperList);
			component.set("v.columns",[
				{ label: 'Previous Diagnosis', fieldName: 'prevDiagnoisis', type: 'text'},
				{ label: 'Search Date', fieldName: 'searchDate', type: 'date'},
			]);
			var displayData = new Array();
			for(var i = 0; i < megaWrapperList.length; i++){
				var displayDataItem;
				var numChecked = 0;
				for(var j=0; j < megaWrapperList[i].diagWrapper.length; j++){
					if(megaWrapperList[i].diagWrapper[j].diagJuncObj.Chosen__c){
						numChecked++;
					}
				}
				if(numChecked === 0){
					displayDataItem = {
							id : megaWrapperList[i].diagWrapper[0].diagJuncObj.Id,
							prevDiagnoisis : 'None Selected',
							searchDate : megaWrapperList[i].diagWrapper[0].diagJuncObj.CreatedDate
					}
				}
				else if(numChecked === 1){
					displayDataItem = {
							id : megaWrapperList[i].diagWrapper[0].diagJuncObj.Id,
							prevDiagnoisis : megaWrapperList[i].diagWrapper[0].diagObj.Name,
							searchDate : megaWrapperList[i].diagWrapper[0].diagJuncObj.CreatedDate
					}
				}
				else{
					displayDataItem = {
							id : megaWrapperList[i].diagWrapper[0].diagJuncObj.Id,
							prevDiagnoisis : 'Multiple Selected',
							searchDate : megaWrapperList[i].diagWrapper[0].diagJuncObj.CreatedDate
					}
				}
				displayData.push(displayDataItem);
			}
			component.set("v.displayList", displayData);
		});
		$A.enqueueAction(action);
	},
	
	goToSearch : function(component, event, helper) {
		var megaWrapperList = component.get("v.megaWrapperList");
		var selectedRows = event.getParam('selectedRows');
		var selectedMegaWrapper;
		for(var i = 0; i < megaWrapperList.length; i++){
			if(selectedRows[0].id == megaWrapperList[i].diagWrapper[0].diagJuncObj.Id){
				selectedMegaWrapper = megaWrapperList[i];
			}
		}
		var sendSymEvent = component.getEvent("fromSearch");
		sendSymEvent.setParams({
			"symptomList":selectedMegaWrapper.searchSymptoms,
			"diagWrapperList":selectedMegaWrapper.diagWrapper,
		});
		sendSymEvent.fire();
		var closeModal = component.getEvent("toggleProfile");
		closeModal.fire();
	},
})