import { required, maxLength, range, nested } from '@rx/annotations';

export class vEmailTemplate {
    constructor(vEmailTemplate?: vEmailTemplate )  {
        let properties = [ "emailTemplateId", "statusId", "subject",];
        for (let property of properties)
            if (vEmailTemplate && vEmailTemplate[property])
                this[property] = vEmailTemplate[property];
    }
 
	emailTemplateId : number =   0 ;
 
    @range(1,2147483647)
	statusId : number =   undefined;
 
    @required()
    @maxLength(200)
	subject : string =   undefined;


}
