public class DiagnosisListItemWrapper 
{
    @AuraEnabled public Diagnosis_Search_Junc__c diagJuncObj {get; set;}
    @AuraEnabled public Diagnosis__c diagObj {get; set;}
    @AuraEnabled public List<Remedy__c> remedyList {get; set;}
    
    public DiagnosisListItemWrapper()
    {
        
    }
    
    public DiagnosisListItemWrapper(Diagnosis_Search_Junc__c diagJuncObj, Diagnosis__c diagObj)
    {
        this.diagJuncObj = diagJuncObj;
        this.diagObj = diagObj;
    }
}