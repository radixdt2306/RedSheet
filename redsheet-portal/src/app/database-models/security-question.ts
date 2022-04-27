import { required, maxLength, range, nested } from '@rx/annotations';

export class SecurityQuestion {
    constructor(securityQuestion?: SecurityQuestion )  {
        let properties = [ "active", "securityQuestionId", "securityQuestionName",];
        for (let property of properties)
            if (securityQuestion && securityQuestion[property])
                this[property] = securityQuestion[property];
    }
 
	active : boolean = false ;
 
	securityQuestionId : number =   0 ;
 
    @required()
    @maxLength(50)
	securityQuestionName : string =   undefined;


}
