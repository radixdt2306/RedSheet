import { required, maxLength, range, nested } from '@rx/annotations';

export class vSMTPSetting {
    constructor(vSMTPSetting?: vSMTPSetting )  {
        let properties = [ "isActive", "isSSL", "sMTPFromEmailAddress", "sMTPHostName", "sMTPPassword", "sMTPPort", "sMTPSettingsId", "sMTPUserName", "status",];
        for (let property of properties)
            if (vSMTPSetting && vSMTPSetting[property])
                this[property] = vSMTPSetting[property];
    }
 
	isActive : boolean = false ;
 
	isSSL : boolean = false ;
 
    @maxLength(100)
	sMTPFromEmailAddress : string =   undefined;
 
    @maxLength(100)
	sMTPHostName : string =   undefined;
 
    @maxLength(100)
	sMTPPassword : string =   undefined;
 
	sMTPPort : number =   undefined;
 
	sMTPSettingsId : number =   0 ;
 
    @maxLength(100)
	sMTPUserName : string =   undefined;
 
    @required()
    @maxLength(100)
	status : string =   undefined;


}
