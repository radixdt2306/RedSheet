import { required, maxLength, range, nested } from '@rx/annotations';

export class PasswordPolicy {
    constructor(passwordPolicy?: PasswordPolicy )  {
        let properties = [ "forcePasswordAlphaNum", "minimumNumberOfCharacters", "numberOfAttempts", "passwordExpiryDuration", "passwordPolicyId",];
        for (let property of properties)
            if (passwordPolicy && passwordPolicy[property])
                this[property] = passwordPolicy[property];
    }
 
	forcePasswordAlphaNum : boolean = false ;
 
    @range(1,2147483647)
	minimumNumberOfCharacters : number =   undefined;
 
    @range(1,2147483647)
	numberOfAttempts : number =   undefined;
 
    @range(1,2147483647)
	passwordExpiryDuration : number =   undefined;
 
	passwordPolicyId : number =   0 ;


}
