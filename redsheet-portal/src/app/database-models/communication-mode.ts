import { required, maxLength, range, nested } from '@rx/annotations';
import { StakeholderCommunicationMode, NanoScopeToNegotiateCommunicationMode, TheirTeamCommunicationMode, LiteBackgroundCommunicationMode,  } from './'
export class CommunicationMode {
    constructor(communicationMode?: CommunicationMode )  {
        let properties = [ "className", "communicationModeId", "communicationModeName", "stakeholderCommunicationModes", "nanoScopeToNegotiateCommunicationModes", "theirTeamCommunicationModes", "liteBackgroundCommunicationModes",];
        for (let property of properties)
            if (communicationMode && communicationMode[property])
                this[property] = communicationMode[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	communicationModeId : number =   0 ;
 
    @required()
    @maxLength(200)
	communicationModeName : string =   undefined;
	@nested(StakeholderCommunicationMode)
	stakeholderCommunicationModes: StakeholderCommunicationMode[];

	@nested(NanoScopeToNegotiateCommunicationMode)
	nanoScopeToNegotiateCommunicationModes: NanoScopeToNegotiateCommunicationMode[];

	@nested(TheirTeamCommunicationMode)
	theirTeamCommunicationModes: TheirTeamCommunicationMode[];

	@nested(LiteBackgroundCommunicationMode)
	liteBackgroundCommunicationModes: LiteBackgroundCommunicationMode[];



}
