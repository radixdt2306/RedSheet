import { required, maxLength, range, nested } from '@rx/annotations';

export class DefaultSetting {
    constructor(defaultSetting?: DefaultSetting )  {
        let properties = [ "cost", "defaultSettingId", "defaultSettingName", "statusId",];
        for (let property of properties)
            if (defaultSetting && defaultSetting[property])
                this[property] = defaultSetting[property];
    }
 
    @required()
	cost : number =   undefined;
 
	defaultSettingId : number =   0 ;
 
    @required()
    @maxLength(200)
	defaultSettingName : string =   undefined;
 
    @range(0,2147483647)
	statusId : number =   undefined;


}
