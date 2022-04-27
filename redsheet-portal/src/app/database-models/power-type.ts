import { required, maxLength, range, nested } from '@rx/annotations';
import { PowerTypeDetail,  } from './'
export class PowerType {
    constructor(powerType?: PowerType )  {
        let properties = [ "powerTypeId", "powerTypeName", "powerTypeDetails",];
        for (let property of properties)
            if (powerType && powerType[property])
                this[property] = powerType[property];
    }
 
	powerTypeId : number =   0 ;
 
    @required()
    @maxLength(200)
	powerTypeName : string =   undefined;
	@nested(PowerTypeDetail)
	powerTypeDetails: PowerTypeDetail[];



}
