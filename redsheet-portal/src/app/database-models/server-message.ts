import { required, maxLength, range, nested } from '@rx/annotations';

export class ServerMessage {
    constructor(serverMessage?: ServerMessage )  {
        let properties = [ "serverMessageId", "serverMessageName",];
        for (let property of properties)
            if (serverMessage && serverMessage[property])
                this[property] = serverMessage[property];
    }
 
	serverMessageId : number =   0 ;
 
    @required()
    @maxLength(50)
	serverMessageName : string =   undefined;


}
