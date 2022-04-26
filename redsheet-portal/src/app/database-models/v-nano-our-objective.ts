import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoOurObjective {
    constructor(vNanoOurObjective?: vNanoOurObjective )  {
        let properties = [ "nanoOurObjectiveId", "nanoOurObjectiveValue", "nanoScopeToNegotiateObjectiveId",];
        for (let property of properties)
            if (vNanoOurObjective && vNanoOurObjective[property])
                this[property] = vNanoOurObjective[property];
    }
 
	nanoOurObjectiveId : number =   0 ;
 
    @required()
    @maxLength(1000)
	nanoOurObjectiveValue : string =   undefined;
 
    @range(1,2147483647)
	nanoScopeToNegotiateObjectiveId : number =   undefined;


}
