import { required, maxLength, range, nested } from '@rx/annotations';
import { CommunicationMode, NanoScopeToNegotiateObjective,  } from './'
export class NanoScopeToNegotiateCommunicationMode {
    constructor(nanoScopeToNegotiateCommunicationMode?: NanoScopeToNegotiateCommunicationMode )  {
        let properties = [ "nanoScopeToNegotiateCommunicationModeId", "communicationModeId", "nanoScopeToNegotiateObjectiveId",];
        for (let property of properties)
            if (nanoScopeToNegotiateCommunicationMode && nanoScopeToNegotiateCommunicationMode[property])
                this[property] = nanoScopeToNegotiateCommunicationMode[property];
    }
 
	nanoScopeToNegotiateCommunicationModeId : number =   0 ;
 
    @range(0,2147483647)
	communicationModeId : number =   undefined;
	communicationMode : CommunicationMode  ;
 
    @range(0,2147483647)
	nanoScopeToNegotiateObjectiveId : number =   undefined;
	nanoScopeToNegotiateObjective : NanoScopeToNegotiateObjective  ;


}
