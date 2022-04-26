import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteNegotiationType {
    constructor(vLiteNegotiationType?: vLiteNegotiationType )  {
        let properties = [ "liteNegotiationTypeId", "liteProjectBackgroundId", "negotiationTypeId", "negotiationTypeName",];
        for (let property of properties)
            if (vLiteNegotiationType && vLiteNegotiationType[property])
                this[property] = vLiteNegotiationType[property];
    }
 
	liteNegotiationTypeId : number =   0 ;
 
    @range(1,2147483647)
	liteProjectBackgroundId : number =   undefined;
 
    @range(1,2147483647)
	negotiationTypeId : number =   undefined;
 
    @required()
    @maxLength(200)
	negotiationTypeName : string =   undefined;


}
