public class DiagnosisDiagnosisItemApexController 
{
	@AuraEnabled
    public static Boolean setToChosen(Diagnosis_Search_Junc__c myJuncObj)
    {
		myJuncObj.Chosen__c = true;
        System.debug(myJuncObj.Chosen__c);
        try
        {
            update myJuncObj;
        }
        catch(DMLException e)
        {
            //return false;
            throw e;
        }
        return true;
    }
}