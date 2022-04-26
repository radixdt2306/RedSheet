import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteProjectBackgroundRecord {
    constructor(vLiteProjectBackgroundRecord?: vLiteProjectBackgroundRecord )  {
        let properties = [ "dateOfNegotiation", "focus", "knowAboutThem", "knownIssues", "liteProjectBackgroundId", "liteRelationshipRequireId", "location", "opponentName", "projectModuleId", "reason", "valueObjectiveId",];
        for (let property of properties)
            if (vLiteProjectBackgroundRecord && vLiteProjectBackgroundRecord[property])
                this[property] = vLiteProjectBackgroundRecord[property];
    }
 
    @required()
	dateOfNegotiation : Date =   undefined;
 
    @required()
    @maxLength(100)
	focus : string =   undefined;
 
    @required()
    @maxLength(250)
	knowAboutThem : string =   undefined;
 
    @required()
    @maxLength(150)
	knownIssues : string =   undefined;
 
	liteProjectBackgroundId : number =   0 ;
 
    @range(1,2147483647)
	liteRelationshipRequireId : number =   undefined;
 
    @required()
    @maxLength(50)
	location : string =   undefined;
 
    @required()
    @maxLength(50)
	opponentName : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @required()
    @maxLength(100)
	reason : string =   undefined;
 
    @range(1,2147483647)
	valueObjectiveId : number =   undefined;


}
