import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectStakeholder,  } from './'
export class StakeholderType {
    constructor(stakeholderType?: StakeholderType )  {
        let properties = [ "actionRequried", "className", "stakeholderTypeId", "stakeholderTypeName", "projectStakeholders",];
        for (let property of properties)
            if (stakeholderType && stakeholderType[property])
                this[property] = stakeholderType[property];
    }
 
    @required()
    @maxLength(200)
	actionRequried : string =   undefined;
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	stakeholderTypeId : number =   0 ;
 
    @required()
    @maxLength(200)
	stakeholderTypeName : string =   undefined;
	@nested(ProjectStakeholder)
	projectStakeholders: ProjectStakeholder[];



}
