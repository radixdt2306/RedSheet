import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteProjectBackground, NegotiationType,  } from './'
export class LiteNegotiationType {
    constructor(liteNegotiationType?: LiteNegotiationType )  {
        let properties = [ "liteNegotiationTypeId", "liteProjectBackgroundId", "negotiationTypeId",];
        for (let property of properties)
            if (liteNegotiationType && liteNegotiationType[property])
                this[property] = liteNegotiationType[property];
    }
 
	liteNegotiationTypeId : number =   0 ;
 
    @range(0,2147483647)
	liteProjectBackgroundId : number =   undefined;
	liteProjectBackground : LiteProjectBackground  ;
 
    @range(0,2147483647)
	negotiationTypeId : number =   undefined;
	negotiationType : NegotiationType  ;


}
