import { required, maxLength, range } from '@rx/annotations';

export class AvoidGesture {
    constructor(avoidGesture?: AvoidGesture )  {
        let properties = [ "avoidGestureId", "avoidGestureValue", "cultureCountryId",];
        for (let property of properties)
            if (avoidGesture && avoidGesture[property])
                this[property] = avoidGesture[property];
    }
 
	avoidGestureId : number =   0 ;
 
    @required()
    @maxLength(500)
	avoidGestureValue : string =   undefined;
 
    @range(1,2147483647)
	cultureCountryId : number =   undefined;
}
