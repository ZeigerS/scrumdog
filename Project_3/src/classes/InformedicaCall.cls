public class InformedicaCall {
    public static final String APP_ID = '8e6cf1eb';
    public static final String APP_KEY = '46f5fabb42f4ec930ca8bebaa77366e7';
    
    @auraEnabled
    public static void sendSymptoms(List<Symptom__c> symList){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.infermedica.com/v2/diagnosis');
        request.setMethod('POST');
        request.setHeader('App-Id', APP_ID);
        request.setHeader('App-Key', APP_KEY);
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        String payload = '{' + 
            '"sex":"male",' +
            '"age":30,' + 
            '"evidence":[';
        //for(symptom__c sym: symList){
        payload +='{';
        payload += '"id":"s_1193",';
        payload += '"choice_id":"present"';
        payload += '}';
        //}
        payload += ']}';
        request.setBody(payload);
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200){
            String jsonInput = response.getBody();
                Map<String, Object> responseMap =
                (Map<String, Object>)
                JSON.deserializeUntyped(jsonInput);
            List<Object> listConditions = (List<Object>) responseMap.get('conditions');
            for(Object o : listConditions){
            	//Diagnosis processing
            	Map<String, Object> cons = (Map<String, Object>) o;
            	system.debug(cons);
            	system.debug(cons.get('name'));
            }
        }
    }
}