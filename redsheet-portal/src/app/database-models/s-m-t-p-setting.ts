import { required, maxLength, range, nested } from '@rx/annotations';
import {  vSMTPSettingRecord  } from './'
export class SMTPSetting {
    constructor(sMTPSetting?: SMTPSetting  | vSMTPSettingRecord )  {
        let properties = [ "isActive", "isSSL", "sMTPFromEmailAddress", "sMTPHostName", "sMTPPassword", "sMTPPort", "sMTPSettingsId", "sMTPUserName", "statusId",];
        for (let property of properties)
            if (sMTPSetting && sMTPSetting[property])
                this[property] = sMTPSetting[property];
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
