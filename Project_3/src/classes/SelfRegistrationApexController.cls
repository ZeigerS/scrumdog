public class SelfRegistrationApexController 
{
    @AuraEnabled
	public static Boolean apexRegUser(String userSex, String userEmail, Date userBirthdate)
    {
        try
        {
            Contact userContact = new Contact();
            userContact.LastName = userEmail;
            userContact.Sex__c = userSex;
            userContact.Birthdate = userBirthdate;
            userContact.AccountId = [SELECT id FROM Account WHERE Name = 'community' LIMIT 1].Id;
            
            insert userContact;
            
            User newUser = new User();
            newUser.Username = userEmail;
            newUser.LastName = userEmail;
            newUser.Email = userEmail;        
            newUser.ContactId = userContact.Id;
            newUser.TimeZoneSidKey = 'America/Phoenix';
            newUser.LocaleSidKey = 'en_US';
            newUser.EmailEncodingKey = 'ISO-8859-1';
            newUser.LanguageLocaleKey = 'en_US';
            newUser.ProfileId = [SELECT Id FROM Profile WHERE Name = 'eDiagnose Community User' LIMIT 1].Id;
            if(userEmail.length() >= 8)
            {
                newUser.Alias = userEmail.substring(0, 8);
            }
            else
            {
                newUser.Alias = userEmail;
                for(Integer i = newUser.Alias.length(); i <= 8; i++)
                {
                    newUser.Alias += i;
                }
            }
            
            insert newUser;
        }
        catch(DMLException e)
        {
            return false;
        }
        catch(QueryException e)
        {
            return false;
        }
        
        return true;
    }
}