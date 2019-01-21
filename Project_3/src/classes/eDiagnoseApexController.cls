public class eDiagnoseApexController 
{
	@AuraEnabled
    public static Contact getUserContact()
    {
		System.debug(UserInfo.getLastName());
        if(UserInfo.getUserType() == 'Guest')
        {
            return null;
        }
        else
        {
            Id userID = [SELECT ContactId FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1].ContactId;
            List<Contact> conList = [SELECT id, Age__c, Sex__c, LastName FROM Contact WHERE Id = :userID];
            
            if(conList.size() == 0)
            {
            	return null;
            }
            else
            {
            	return conList[0];
            }
            
            //return [SELECT id, Age__c, Sex__c FROM Contact WHERE Id = :userID LIMIT 1];
        }
    }
}