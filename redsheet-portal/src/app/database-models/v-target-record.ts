import { required, maxLength, range, nested } from '@rx/annotations';

export class vTargetRecord {
    constructor(vTargetRecord?: vTargetRecord )  {
        let properties = [ "projectNegotiationId", "targetDetail", "targetId",];
        for (let property of properties)
            if (vTargetRecord && vTargetRecord[property])
                this[property] = vTargetRecord[property];
    }
 
	projectNegotiationId : number =   0 ;
 
    @required()
    @maxLength(1000)
	targetDetail : string =   undefined;
 
    @range(1,2147483647)
	targetId : number =   undefined;


}
