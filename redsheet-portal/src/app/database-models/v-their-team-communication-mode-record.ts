import { required, maxLength, range, nested } from '@rx/annotations';

export class vTheirTeamCommunicationModeRecord {
    constructor(vTheirTeamCommunicationModeRecord?: vTheirTeamCommunicationModeRecord )  {
        let properties = [ "communicationModeId", "projectNegotiationId", "theirTeamCommunicationModeId",];
        for (let property of properties)
            if (vTheirTeamCommunicationModeRecord && vTheirTeamCommunicationModeRecord[property])
                this[property] = vTheirTeamCommunicationModeRecord[property];
    }
 
	communicationModeId : number =   0 ;
 
    @range(1,2147483647)
	projectNegotiationId : number =   undefined;
 
    @range(1,2147483647)
	theirTeamCommunicationModeId : number =   undefined;


}
