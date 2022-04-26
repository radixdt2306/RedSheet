import { required, maxLength, range, nested } from '@rx/annotations';
import { EmailTemplateDetail, GlobalSetting,  } from './'
export class Language {
    constructor(language?: Language )  {
        let properties = [ "active", "autoTranslate", "languageCode", "languageId", "languageName", "emailTemplateDetails", "globalSettings",];
        for (let property of properties)
            if (language && language[property])
                this[property] = language[property];
    }
 
	active : boolean = false ;
 
	autoTranslate : boolean = false ;
 
    @required()
    @maxLength(2)
	languageCode : string =   undefined;
 
	languageId : number =   0 ;
 
    @required()
    @maxLength(100)
	languageName : string =   undefined;
	@nested(EmailTemplateDetail)
	emailTemplateDetails: EmailTemplateDetail[];

	@nested(GlobalSetting)
	globalSettings: GlobalSetting[];



}
