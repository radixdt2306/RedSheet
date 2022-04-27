import { required, maxLength, range, nested } from '@rx/annotations';
import { ApplicationTimeZone, Language,  } from './'
export class GlobalSetting {
    constructor(globalSetting?: GlobalSetting )  {
        let properties = [ "autoTranslation", "configurationId", "lockDuration", "passwordPolicy", "recordLock", "requestLogging", "socialAuth", "twoFactorAuthentication", "applicationTimeZoneId", "languageId",];
        for (let property of properties)
            if (globalSetting && globalSetting[property])
                this[property] = globalSetting[property];
    }
 
	autoTranslation : boolean = false ;
 
	configurationId : number =   0 ;
 
    @maxLength(10)
	lockDuration : string =   undefined;
 
	passwordPolicy : number =   undefined;
 
	recordLock : boolean = false ;
 
	requestLogging : boolean = false ;
 
	socialAuth : boolean = false ;
 
	twoFactorAuthentication : boolean = false ;
 
    @range(0,2147483647)
	applicationTimeZoneId : number =   undefined;
	applicationTimeZone : ApplicationTimeZone  ;
 
    @range(0,2147483647)
	languageId : number =   undefined;
	language : Language  ;


}
