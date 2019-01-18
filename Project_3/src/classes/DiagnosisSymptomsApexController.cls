/**
 * Creator: Larry Resnik
 * Created: 1/16/2019
 * Changed: 1/16/2019
 * Apex controller that gets human-readable symptoms related to some search.
 */
public class DiagnosisSymptomsApexController {
    /**
     * Gets the names of all symptoms related to some search.
     * @author	Larry Resnik
     * @param	searchId	The search junction object's unique identifier.
     * 			It should have a format like SN-####.
     * @return	A list of human-readable symptoms.
     * @since	1.0
     */
	@AuraEnabled
    public static List<String> getSymptomNamesFromSearch(String searchId) {
        List<String> symptomNames = new List<String>();
        for (Symptom_Search_Junc__c searchObj :
             [SELECT Id, Search__c, Symptom__c, Symptom__r.Name
              FROM Symptom_Search_Junc__c
              WHERE Search__r.Name = :searchID]) {
            symptomNames.add(searchObj.Symptom__r.Name);
        }
        return symptomNames;
    }
}