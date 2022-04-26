import { required, maxLength, range, nested } from '@rx/annotations';

export class vStakeholderCommunicationMode {
    constructor(vStakeholderCommunicationMode?: vStakeholderCommunicationMode )  {
        let properties = [ "communicationModeId", "communicationModeName", "projectStakeholderId", "stakeholderCommunicationModeId",];
        for (let property of properties)
            if (vStakeholderCommunicationMode && vStakeholderCommunicationMode[property])
                this[property] = vStakeholderCommunicationMode[property];
    }
 
	communicationModeId : number =   0 ;
 
    @required()
    @maxLength(200)
	communicationModeName : string =   undefined;
 
    @range(1,2147483647)
	projectStakeholderId : number =   undefined;
 
    @range(1,2147483647)
	stakeholderCommunicationModeId : number =   undefined;


}
