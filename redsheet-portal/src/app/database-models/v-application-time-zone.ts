import { required, maxLength, range, nested } from '@rx/annotations';

export class vApplicationTimeZone {
    constructor(vApplicationTimeZone?: vApplicationTimeZone )  {
        let properties = [ "applicationTimeZoneId", "applicationTimeZoneName",];
        for (let property of properties)
            if (vApplicationTimeZone && vApplicationTimeZone[property])
                this[property] = vApplicationTimeZone[property];
    }
 
	applicationTimeZoneId : number =   0 ;
 
    @required()
    @maxLength(153)
	applicationTimeZoneName : string =   undefined;


}
