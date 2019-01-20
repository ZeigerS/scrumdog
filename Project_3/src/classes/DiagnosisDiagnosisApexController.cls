public class DiagnosisDiagnosisApexController 
{
    
    @AuraEnabled
    public static List<DiagnosisListItemWrapper> getWrapperObject(List<Double> likely, List<String> diagName)
    {
        List<DiagnosisListItemWrapper> returnList = new List<DiagnosisListItemWrapper>();
        System.debug(likely);
        System.debug(diagName);
        
        for(Integer i = 0; i < likely.size(); i++)
        {
            
            
            DiagnosisListItemWrapper returnItem = new DiagnosisListItemWrapper();
            returnItem.diagJuncObj = new Diagnosis_Search_Junc__c(Likelihood__c = likely[i], Chosen__c = false);
            returnItem.diagObj = new Diagnosis__c(Name = diagName[i]);
            
            returnList.add(returnItem);
        }
        
        
        
        return returnList;
    }
    
    /*
    public class DiagnosisListItemWrapper 
    {
        @AuraEnabled public Diagnosis_Search_Junc__c diagJuncObj {get; set;}
        @AuraEnabled public Diagnosis__c diagObj {get; set;}
        
        public DiagnosisListItemWrapper()
        {
            
        }
        
        public DiagnosisListItemWrapper(Diagnosis_Search_Junc__c diagJuncObj, Diagnosis__c diagObj)
        {
            this.diagJuncObj = diagJuncObj;
            this.diagObj = diagObj;
        }
    }
*/
}