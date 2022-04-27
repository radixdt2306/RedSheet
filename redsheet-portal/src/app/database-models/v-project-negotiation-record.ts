import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectNegotiationRecord {
    constructor(vProjectNegotiationRecord?: vProjectNegotiationRecord )  {
        let properties = [ "eventDate", "intangiblePowerPlan", "knowAboutThem", "knownIssues", "location", "projectModuleId", "projectNegotiationId",];
        for (let property of properties)
            if (vProjectNegotiationRecord && vProjectNegotiationRecord[property])
                this[property] = vProjectNegotiationRecord[property];
    }
 
    @required()
	eventDate : Date =   undefined;
 
    @required()
    @maxLength(400)
	intangiblePowerPlan : string =   undefined;
 
    @maxLength(500)
	knowAboutThem : string =   undefined;
 
    @maxLength(750)
	knownIssues : string =   undefined;
 
    @required()
    @maxLength(50)
	location : string =   undefined;
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectNegotiationId : number =   undefined;


}
