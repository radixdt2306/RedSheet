import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoScopeToNegotiateObjectiveRecord {
    constructor(vNanoScopeToNegotiateObjectiveRecord?: vNanoScopeToNegotiateObjectiveRecord )  {
        let properties = [ "buy", "date", "focus", "knowAboutThem", "nanoRelationshipRequireId", "nanoScopeToNegotiateId", "nanoScopeToNegotiateObjectiveId", "opponentName", "projectModuleId", "reason", "valueObjectiveId",];
        for (let property of properties)
            if (vNanoScopeToNegotiateObjectiveRecord && vNanoScopeToNegotiateObjectiveRecord[property])
                this[property] = vNanoScopeToNegotiateObjectiveRecord[property];
    }
 
    @required()
    @maxLength(1000)
	buy : string =   undefined;
 
    @required()
	date : Date =   undefined;
 
    @required()
    @maxLength(1000)
	focus : string =   undefined;
 
    @required()
    @maxLength(1000)
	knowAboutThem : string =   undefined;
 
	nanoRelationshipRequireId : number =   0 ;
 
    @range(1,2147483647)
	nanoScopeToNegotiateId : number =   undefined;
 
    @range(1,2147483647)
	nanoScopeToNegotiateObjectiveId : number =   undefined;
 
    @required()
    @maxLength(1000)
	opponentName : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @required()
    @maxLength(1000)
	reason : string =   undefined;
 
    @range(1,2147483647)
	valueObjectiveId : number =   undefined;


}
