import { required, maxLength, range, nested } from '@rx/annotations';

export class vSMTPSettingRecord {
    constructor(vSMTPSettingRecord?: vSMTPSettingRecord )  {
        let properties = [ "isActive", "isSSL", "sMTPFromEmailAddress", "sMTPHostName", "sMTPPassword", "sMTPPort", "sMTPSettingsId", "sMTPUserName", "statusId",];
        for (let property of properties)
            if (vSMTPSettingRecord && vSMTPSettingRecord[property])
                this[property] = vSMTPSettingRecord[property];
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
 
	statusId : number =   undefined;


}
