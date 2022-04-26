import { required, maxLength, range, nested } from '@rx/annotations';
import { EmailTemplateDetail,  } from './'
export class EmailTemplate {
    constructor(emailTemplate?: EmailTemplate )  {
        let properties = [ "body", "emailTemplateId", "emailTemplateName", "isActive", "statusId", "subject", "emailTemplateDetails",];
        for (let property of properties)
            if (emailTemplate && emailTemplate[property])
                this[property] = emailTemplate[property];
    }
 
    @required()
	body : string =   undefined;
 
	emailTemplateId : number =   0 ;
 
    @required()
    @maxLength(100)
	emailTemplateName : string =   undefined;
 
	isActive : boolean = false ;
 
    @range(1,2147483647)
	statusId : number =   undefined;
 
    @required()
    @maxLength(200)
	subject : string =   undefined;
	@nested(EmailTemplateDetail)
	emailTemplateDetails: EmailTemplateDetail[];



}
