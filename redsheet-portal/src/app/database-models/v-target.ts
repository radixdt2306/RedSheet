import { required, maxLength, range, nested } from '@rx/annotations';

export class vTarget {
    constructor(vTarget?: vTarget )  {
        let properties = [ "projectNegotiationId", "targetDetail", "targetId",];
        for (let property of properties)
            if (vTarget && vTarget[property])
                this[property] = vTarget[property];
    }
 
	projectNegotiationId : number =   0 ;
 
    @required()
    @maxLength(1000)
	targetDetail : string =   undefined;
 
    @range(1,2147483647)
	targetId : number =   undefined;


}
