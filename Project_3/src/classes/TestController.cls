public class TestController 
{
	@AuraEnabled
	public static Contact getAContact()
	{
		return [SELECT id FROM Contact LIMIT 1];
	}
}