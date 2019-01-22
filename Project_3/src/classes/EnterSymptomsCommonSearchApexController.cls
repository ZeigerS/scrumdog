public class EnterSymptomsCommonSearchApexController {
    @auraEnabled
    public static list<Symptom__c> symptomQuery() {
        return [SELECT Id, name, Number_of_Searches__c FROM Symptom__c ORDER BY Number_of_Searches__c DESC LIMIT 10];
    }
}