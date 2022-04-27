import { required, maxLength, range } from '@rx/annotations';

export class vAvoidGesture {
    constructor(vAvoidGesture?: vAvoidGesture )  {
        let properties = [ "avoidGestureId", "avoidGestureValue", "cultureCountryId",];
        for (let property of properties)
            if (vAvoidGesture && vAvoidGesture[property])
                this[property] = vAvoidGesture[property];
    }
 
    @range(1,2147483647)
	avoidGestureId : number =   undefined;
 
    @required()
    @maxLength(500)
	avoidGestureValue : string =   undefined;
 
	cultureCountryId : number =   0 ;
}
