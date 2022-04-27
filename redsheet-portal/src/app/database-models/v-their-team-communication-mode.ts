import { required, maxLength, range, nested } from '@rx/annotations';

export class vTheirTeamCommunicationMode {
    constructor(vTheirTeamCommunicationMode?: vTheirTeamCommunicationMode )  {
        let properties = [ "communicationModeId", "projectNegotiationId", "theirTeamCommunicationModeId",];
        for (let property of properties)
            if (vTheirTeamCommunicationMode && vTheirTeamCommunicationMode[property])
                this[property] = vTheirTeamCommunicationMode[property];
    }
 
	communicationModeId : number =   0 ;
 
    @range(1,2147483647)
	projectNegotiationId : number =   undefined;
 
    @range(1,2147483647)
	theirTeamCommunicationModeId : number =   undefined;


}
