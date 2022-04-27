import { required, maxLength, range, nested } from '@rx/annotations';

export class vDefaultSetting {
    constructor(vDefaultSetting?: vDefaultSetting )  {
        let properties = [ "cost", "defaultSettingId", "defaultSettingName", "status",];
        for (let property of properties)
            if (vDefaultSetting && vDefaultSetting[property])
                this[property] = vDefaultSetting[property];
    }
 
    @required()
	cost : number =   undefined;
 
	defaultSettingId : number =   0 ;
 
    @required()
    @maxLength(200)
	defaultSettingName : string =   undefined;
 
    @required()
    @maxLength(100)
	status : string =   undefined;


}
