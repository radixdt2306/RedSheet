import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, TheirTeamMember, TheirTeamCommunicationMode, Target,  vProjectNegotiationRecord  } from './'
export class ProjectNegotiation {
    constructor(projectNegotiation?: ProjectNegotiation  | vProjectNegotiationRecord )  {
        let properties = [ "eventDate", "intangiblePowerPlan", "knowAboutThem", "knownIssues", "location", "projectNegotiationId", "projectModuleId", "theirTeamMembers", "theirTeamCommunicationModes", "targets",];
        for (let property of properties)
            if (projectNegotiation && projectNegotiation[property])
                this[property] = projectNegotiation[property];
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
 
	projectNegotiationId : number =   0 ;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
	@nested(TheirTeamMember)
	theirTeamMembers: TheirTeamMember[];

	@nested(TheirTeamCommunicationMode)
	theirTeamCommunicationModes: TheirTeamCommunicationMode[];

	@nested(Target)
	targets: Target[];



}
