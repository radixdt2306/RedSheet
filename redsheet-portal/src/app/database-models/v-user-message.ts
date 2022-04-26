import { required, maxLength, range, nested } from '@rx/annotations';

export class vUserMessage {
    constructor(vUserMessage?: vUserMessage )  {
        let properties = [ "createdBy", "createdOn", "message", "status", "updatedBy", "updatedOn", "userMessageId",];
        for (let property of properties)
            if (vUserMessage && vUserMessage[property])
                this[property] = vUserMessage[property];
    }
 
    @required()
    @maxLength(100)
	createdBy : string =   undefined;
 
	createdOn : Date =   undefined;
 
    @required()
	message : string =   undefined;
 
    @required()
    @maxLength(100)
	status : string =   undefined;
 
    @required()
    @maxLength(100)
	updatedBy : string =   undefined;
 
	updatedOn : Date =   undefined;
 
	userMessageId : number =   0 ;


}
