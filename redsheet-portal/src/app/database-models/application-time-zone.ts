import { required, maxLength, range, nested } from '@rx/annotations';
import { GlobalSetting,  } from './'
export class ApplicationTimeZone {
    constructor(applicationTimeZone?: ApplicationTimeZone )  {
        let properties = [ "active", "applicationTimeZoneId", "applicationTimeZoneName", "comment", "countryId", "globalSettings",];
        for (let property of properties)
            if (applicationTimeZone && applicationTimeZone[property])
                this[property] = applicationTimeZone[property];
    }
 
	active : boolean = false ;
 
	applicationTimeZoneId : number =   0 ;
 
    @required()
    @maxLength(100)
	applicationTimeZoneName : string =   undefined;
 
    @required()
    @maxLength(200)
	comment : string =   undefined;
 
    @range(1,2147483647)
	countryId : number =   undefined;
	@nested(GlobalSetting)
	globalSettings: GlobalSetting[];



}
