public class searchHistoryApexController {

	@auraEnabled
	public static List<searchHistoryWrapper> getSearchHistory(){
		List<searchHistoryWrapper> returnWrapperList = new List<searchHistoryWrapper>();
		ID userId = UserInfo.getUserId();
		List<Search__c> currentSearched = [select id, CreatedDate,
						(select Chosen__c, Diagnosis__c, Likelihood__c, CreatedDate from Diagnosis_Search_Juncs__r order by chosen__c desc),
						(select Symptom__c from Symptom_Search_Juncs__r)
		 				from Search__c where CreatedById = :userId order by CreatedDate DESC];
		Set<Id> diagIds = new Set<Id>();
		Set<Id> symIds = new Set<Id>();
		for(Search__c s : currentSearched){
			for(Diagnosis_Search_Junc__c dsj : s.Diagnosis_Search_Juncs__r){
				diagIds.add(dsj.Diagnosis__c);
			}
			for(Symptom_Search_Junc__c ssj : s.Symptom_Search_Juncs__r){
				symIds.add(ssj.Symptom__c);
			}
		}
		List<Diagnosis__c> currentSearchedDiagnosis = [Select id, name from Diagnosis__c where id IN :diagIds];
		List<Symptom__c> currentSearchedSymptom = [SELECT id, name FROM Symptom__c WHERE id IN :symIds];
		Map<Id, Diagnosis__c> diagMap = new Map<Id, Diagnosis__c>();
		Map<Id, Symptom__c> symMap = new Map<Id, Symptom__c>();
		for(Diagnosis__c d : currentSearchedDiagnosis){
			diagMap.put(d.Id, d);
		}
		for(Symptom__c s : currentSearchedSymptom){
			symMap.put(s.Id, s);
		}
		for(Search__c s : currentSearched){
			List<DiagnosisListItemWrapper> diagWrapperList = new List<DiagnosisListItemWrapper>();
			List<Symptom__c> symptomList = new List<Symptom__c>();
			for(Diagnosis_Search_Junc__c dsj : s.Diagnosis_Search_Juncs__r){
				DiagnosisListItemWrapper diagListItem = new DiagnosisListItemWrapper();
				diagListItem.diagJuncObj = dsj;
				diagListItem.diagObj = diagMap.get(dsj.diagnosis__c);
				diagWrapperList.add(diagListItem);
			}
			for(Symptom_Search_Junc__c ssj : s.Symptom_Search_Juncs__r){
				symptomList.add(symMap.get(ssj.symptom__c));
			}
			returnWrapperList.add(new searchHistoryWrapper(diagWrapperList, symptomList));
		}
		return  returnWrapperList;
	}


	public class searchHistoryWrapper{
		@auraEnabled public List<DiagnosisListItemWrapper> diagWrapper{get;set;}
		@auraEnabled public List<Symptom__c> searchSymptoms {get;set;}
		
		public searchHistoryWrapper(){
			
		}
		
		public searchHistoryWrapper(List<DiagnosisListItemWrapper> diagWrapper, List<Symptom__c> searchSymptoms){
			this.diagWrapper = diagWrapper;
			this.searchSymptoms = searchSymptoms;
		}
	}
}