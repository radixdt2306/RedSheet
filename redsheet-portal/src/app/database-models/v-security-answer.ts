import { required, maxLength, range, nested } from '@rx/annotations';

export class vSecurityAnswer {
    constructor(vSecurityAnswer?: vSecurityAnswer )  {
        let properties = [ "securityAnswer", "securityQuestionName", "userId", "userName",];
        for (let property of properties)
            if (vSecurityAnswer && vSecurityAnswer[property])
                this[property] = vSecurityAnswer[property];
    }
 
    @maxLength(50)
	securityAnswer : string =   undefined;
 
    @required()
    @maxLength(50)
	securityQuestionName : string =   undefined;
 
	userId : number =   0 ;
 
    @maxLength(50)
	userName : string =   undefined;


}
