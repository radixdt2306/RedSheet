import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectNegotiation,  vTargetRecord  } from './'
export class Target {
    constructor(target?: Target  | vTargetRecord )  {
        let properties = [ "targetDetail", "targetId", "projectNegotiationId",];
        for (let property of properties)
            if (target && target[property])
                this[property] = target[property];
    }
 
    @required()
    @maxLength(200)
	targetDetail : string =   undefined;
 
	targetId : number =   0 ;
 
    @range(0,2147483647)
	projectNegotiationId : number =   undefined;
	projectNegotiation : ProjectNegotiation  ;


}
