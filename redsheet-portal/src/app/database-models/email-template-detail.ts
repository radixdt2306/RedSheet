import { required, maxLength, range, nested } from '@rx/annotations';
import { ApplicationModule, EmailTemplate, LanguageContent, Language,  } from './'
export class EmailTemplateDetail {
    constructor(emailTemplateDetail?: EmailTemplateDetail )  {
        let properties = [ "action", "emailTemplateDetailId", "applicationModuleId", "emailTemplateId", "languageContentId", "languageId", "operationMode",];
        for (let property of properties)
            if (emailTemplateDetail && emailTemplateDetail[property])
                this[property] = emailTemplateDetail[property];
    }
 
    @required()
    @maxLength(10)
	action : string =   undefined;
 
	emailTemplateDetailId : number =   0 ;
 
    @range(0,2147483647)
	applicationModuleId : number =   undefined;
	applicationModule : ApplicationModule  ;
 
    @range(0,2147483647)
	emailTemplateId : number =   undefined;
	emailTemplate : EmailTemplate  ;
 
    @range(0,2147483647)
	languageContentId : number =   undefined;
	languageContent : LanguageContent  ;
 
    @range(0,2147483647)
	languageId : number =   undefined;
	language : Language  ;

	operationMode : string =   undefined;

}
