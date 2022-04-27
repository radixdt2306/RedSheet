import { required, maxLength, range, nested } from '@rx/annotations';
import { CommunicationMode, ProjectStakeholder,  } from './'
export class StakeholderCommunicationMode {
    constructor(stakeholderCommunicationMode?: StakeholderCommunicationMode )  {
        let properties = [ "stakeholderCommunicationModeId", "communicationModeId", "projectStakeholderId", "isActive", "removeIndex",];
        for (let property of properties)
            if (stakeholderCommunicationMode && stakeholderCommunicationMode[property])
                this[property] = stakeholderCommunicationMode[property];
    }
 
	stakeholderCommunicationModeId : number =   0 ;
 
    @range(0,2147483647)
	communicationModeId : number =   undefined;
	communicationMode : CommunicationMode  ;
 
    @range(0,2147483647)
	projectStakeholderId : number =   undefined;
	projectStakeholder : ProjectStakeholder  ;

	isActive :  boolean=   undefined;
	removeIndex :  number=   undefined;

}
