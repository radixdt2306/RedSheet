import { required, maxLength, range, nested } from '@rx/annotations';
import { 
	CommunicationMode,
	vProjectNegotiationRecord,
	ProjectNegotiation,
	TheirTeamCommunicationMode,
	ProjectModule,
} from 'app/database-models';

export class ProjectNegotiationLookupGroup {
	communicationModes : CommunicationMode[];
	vProjectNegotiationRecord : vProjectNegotiationRecord;
	projectNegotiation : ProjectNegotiation;
}

export class  NegotiationCommunicationModeViewModels{
	constructor(projectNegotiation?: ProjectNegotiation  | vProjectNegotiationRecord )  {
        let properties = [ "isActive","removeIndex","eventDate", "projectNegotiationId", "knowAboutThem", "projectModuleId", "knownIssues","location",];
        for (let property of properties)
            if (projectNegotiation && projectNegotiation[property])
                this[property] = projectNegotiation[property];
    }
 
    @required()
    @maxLength(500)
	location : string =   undefined;
 
	projectNegotiationId : number =   0 ;
 
	knownIssues : string =   undefined;
	knowAboutThem : string =   undefined;
 
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
 

	isActive : boolean =   false;
	removeIndex:number;
    @nested(TheirTeamCommunicationMode)
	theirTeamCommunicationModes: TheirTeamCommunicationMode[];
}
