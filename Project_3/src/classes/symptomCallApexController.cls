public class symptomCallApexController {
	public static final String APP_ID = '8e6cf1eb';
    public static final String APP_KEY = '46f5fabb42f4ec930ca8bebaa77366e7';
    
    @auraEnabled
    public static List<List<Object>> infermedicaCall(List<Symptom__c> syms){
    	List<List<Object>> ret = new List<List<Object>>();
    	List<diagnosisWrapper> dw = new List<diagnosisWrapper>();
    	List<DiagnosisListItemWrapper> ldliw = new List<DiagnosisListItemWrapper>();
    	Http http = new Http();
    	HttpRequest request = new HttpRequest();
    	request.setEndpoint('https://api.infermedica.com/v2/diagnosis');
    	request.setMethod('POST');
        request.setHeader('App-Id', APP_ID);
        request.setHeader('App-Key', APP_KEY);
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        string payload = getPayload(syms);
        request.setBody(payload);
        //HttpResponse response = http.send(request);
        //if(response.getStatusCode() == 200){
        	//String jsonInput = response.getBody();
        	String jsonInput = '{ "questions":{ "type": "single", "text": "Is your vision impaired?", "items": [ { "id": "s_320", "name": "Impaired vision", "choices": [ { "id": "present", "label": "Yes" }, { "id": "absent", "label": "No" }, { "id": "unknown", "label": "Don\'t know" } ] } ], "extras": {} }, "conditions":[ { "id": "c_49", "name": "Migraine", "probability": 0.4532 }, { "id": "c_151", "name": "Meningitis", "probability": 0.2942 }, { "id": "c_55", "name": "Tension-type headaches", "probability": 0.1787 } ] }';
            Map<String, Object> m = (Map<String, Object>) JSON.deserializeUntyped(jsonInput);
			system.debug('Deserialized json: ' + m);
			List<Object> lo = (List<Object>) m.get('conditions');
			system.debug('Hopefully a list of conditions: ' + lo);
			List<Diagnosis__c> master = [SELECT id, name, cID__c from Diagnosis__c];
			List<Diagnosis__c> current = new List<Diagnosis__c>();
			for(Object o : lo){
			    Map<String, Object> thisDiag = (Map<String, Object>) o;
 			   for(Diagnosis__c d : master){
  			      if(thisDiag.get('id') == (d.cId__c)){
   			         dw.add(new diagnosisWrapper(d,Double.ValueOf(thisDiag.get('probability'))));
   			       }
   				}
			}
			Search__c thisSearch = new Search__c();
			insert thisSearch;
			List<Symptom_Search_Junc__c> lssj = new List<Symptom_Search_Junc__c>();
			List<Diagnosis_Search_Junc__c> ldsj = new List<Diagnosis_Search_Junc__c>();
			for(Symptom__c s : syms){
				lssj.add(new Symptom_Search_Junc__c(Search__c=thisSearch.Id,Symptom__c=s.Id));
			}
			for(diagnosisWrapper wrap : dw){
				Diagnosis_Search_Junc__c dsj = new Diagnosis_Search_Junc__c();
				dsj.Search__c = thisSearch.Id;
				dsj.Diagnosis__c = wrap.thisDiag.Id;
				dsj.Likelihood__c = wrap.prob;
				ldliw.add(new DiagnosisListItemWrapper(dsj, wrap.thisDiag));
				ldsj.add(dsj);
			}
			insert lssj;
			insert ldsj;
			ret.add(lssj);
			ret.add(ldliw);
        //}
        return ret;
    }
    
    private static String getPayload(List<Symptom__c> syms){
    	String retVal = '{"sex":"male","age":"30","evidence":[';
    	for(symptom__c sym : syms){
    		retVal += '{"id":"';
    		retVal += sym.sID__c;
    		retVal += '","choice_id":"present"},';    		
    	}
    	retVal = retVal.removeEnd(',');
    	retVal += ']}';
    	return retVal;
    }
    
    public class diagnosisWrapper{
    	Diagnosis__c thisDiag;
    	Double prob;
    	
    	public diagnosisWrapper(Diagnosis__c thisDiag, Double prob){
    		this.thisDiag = thisDiag;
    		this.prob = 100 * prob;
    	}
    }
    
    @AuraEnabled
    public static List<Symptom__c> findAll() {
        return [SELECT id, name FROM Symptom__c ORDER BY name ASC];
    }

    /*@AuraEnabled
    public static List<Symptom__c> findByName(String searchKey) {
        String name = '%' + searchKey + '%';
        return [SELECT id, name FROM Symptom__c WHERE name LIKE :name LIMIT 50];
    }*/

    @AuraEnabled
    public static Symptom__c findById(Id symId) {
        return [SELECT id, name
                    FROM Symptom__c WHERE Id = :symId];
    }
}