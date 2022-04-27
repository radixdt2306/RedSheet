import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoOurObjectiveRecord {
    constructor(vNanoOurObjectiveRecord?: vNanoOurObjectiveRecord )  {
        let properties = [ "nanoOurObjectiveId", "nanoOurObjectiveValue", "nanoScopeToNegotiateObjectiveId",];
        for (let property of properties)
            if (vNanoOurObjectiveRecord && vNanoOurObjectiveRecord[property])
                this[property] = vNanoOurObjectiveRecord[property];
    }
 
	nanoOurObjectiveId : number =   0 ;
 
    @required()
    @maxLength(1000)
	nanoOurObjectiveValue : string =   undefined;
 
    @range(1,2147483647)
	nanoScopeToNegotiateObjectiveId : number =   undefined;


}
