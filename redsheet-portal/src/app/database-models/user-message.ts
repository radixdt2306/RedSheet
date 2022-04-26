import { required, maxLength, range, nested } from '@rx/annotations';
import { User,  } from './'
export class UserMessage {
    constructor(userMessage?: UserMessage )  {
        let properties = [ "createdOn", "message", "updatedOn", "userMessageId", "createdBy", "statusId", "updatedBy",];
        for (let property of properties)
            if (userMessage && userMessage[property])
                this[property] = userMessage[property];
    }
 
	createdOn : Date =   undefined;
 
    @required()
	message : string =   undefined;
 
	updatedOn : Date =   undefined;
 
	userMessageId : number =   0 ;
 
    @range(0,2147483647)
	createdBy : number =   undefined;
	user : User  ;
 
	statusId : number =   undefined;
 
	updatedBy : number =   undefined;
	user1 : User  ;


}
