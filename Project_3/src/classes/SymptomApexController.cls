public class SymptomSearchApexController {

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