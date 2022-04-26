import { required, maxLength, range, nested } from '@rx/annotations';
import { CommunicationMode, ProjectNegotiation,  vTheirTeamCommunicationModeRecord  } from './'
export class TheirTeamCommunicationMode {
    constructor(theirTeamCommunicationMode?: TheirTeamCommunicationMode  | vTheirTeamCommunicationModeRecord )  {
        let properties = [ "theirTeamCommunicationModeId", "communicationModeId", "projectNegotiationId",];
        for (let property of properties)
            if (theirTeamCommunicationMode && theirTeamCommunicationMode[property])
                this[property] = theirTeamCommunicationMode[property];
    }
 
	theirTeamCommunicationModeId : number =   0 ;
 
    @range(0,2147483647)
	communicationModeId : number =   undefined;
	communicationMode : CommunicationMode  ;
 
    @range(0,2147483647)
	projectNegotiationId : number =   undefined;
	projectNegotiation : ProjectNegotiation  ;


}
