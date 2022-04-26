import { 
	CommunicationMode,
	StakeholderType,
	vProjectStakeholderRecord,
	ProjectStakeholder,
	StakeholderCommunicationMode,
	ProjectModule,
} from 'app/database-models';
import { required, maxLength, nested } from '@rx/annotations';

export class ProjectStakeholderLookupGroup {
	communicationModes : CommunicationMode[];
	stakeholderTypes : StakeholderType[];
	vProjectStakeholderRecord : vProjectStakeholderRecord;
	projectStakeholder : ProjectStakeholder;
}



export class StakeholderCommunicationModeViewModels{
	constructor(projectStakeholder?: ProjectStakeholder  | vProjectStakeholderRecord )  {
        let properties = [ "isActive","removeIndex","frequancy", "projectStakeholderId", "stakeholderName", "projectModuleId", "stakeholderTypeId",];
        for (let property of properties)
            if (projectStakeholder && projectStakeholder[property])
                this[property] = projectStakeholder[property];
    }
 
    @required()
    @maxLength(500)
	frequancy : string =   undefined;
 
	projectStakeholderId : number =   0 ;
 
    @required()
    @maxLength(200)
	stakeholderName : string =   undefined;
 
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
 
	stakeholderTypeId : number =   undefined;

	isActive : boolean =   false;
	removeIndex:number;
    stakeholderType : StakeholderType  ;
    @nested(StakeholderCommunicationMode)
	stakeholderCommunicationModes: StakeholderCommunicationMode[];
}