import { required, maxLength, range, nested } from '@rx/annotations';
import { NanoScopeToNegotiateObjective,  vNanoOurObjectiveRecord  } from './'
export class NanoOurObjective {
    constructor(nanoOurObjective?: NanoOurObjective  | vNanoOurObjectiveRecord )  {
        let properties = [ "nanoOurObjectiveId", "nanoOurObjectiveValue", "nanoScopeToNegotiateObjectiveId",];
        for (let property of properties)
            if (nanoOurObjective && nanoOurObjective[property])
                this[property] = nanoOurObjective[property];
    }
 
	nanoOurObjectiveId : number =   0 ;
 
    @required()
    @maxLength(150)
	nanoOurObjectiveValue : string =   undefined;
 
    @range(0,2147483647)
	nanoScopeToNegotiateObjectiveId : number =   undefined;
	nanoScopeToNegotiateObjective : NanoScopeToNegotiateObjective  ;


}
