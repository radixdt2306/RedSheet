import { required, maxLength, range, nested } from '@rx/annotations';

export class vPowerType {
    constructor(vPowerType?: vPowerType )  {
        let properties = [ "powerTypeId", "powerTypeName",];
        for (let property of properties)
            if (vPowerType && vPowerType[property])
                this[property] = vPowerType[property];
    }
 
	powerTypeId : number =   0 ;
 
    @required()
    @maxLength(200)
	powerTypeName : string =   undefined;


}
