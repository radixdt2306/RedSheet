import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectRequirement, ProjectZoma,  vTheirRequirementDetailRecord  } from './'
export class TheirRequirementDetail {
    constructor(theirRequirementDetail?: TheirRequirementDetail  | vTheirRequirementDetailRecord )  {
        let properties = [ "ldo", "mdo", "requirement", "sortOrder", "theirRequirementDetailId", "projectRequirementId", "projectZomas", "projectModuleId", "previousTheirRequirementId", "previousTheirRequirementDetailSortOrder",];
        for (let property of properties)
            if (theirRequirementDetail && theirRequirementDetail[property])
                this[property] = theirRequirementDetail[property];
    }

    @required()
    @maxLength(150)
	ldo : string =   undefined;

    @required()
    @maxLength(150)
	mdo : string =   undefined;

    @required()
    @maxLength(150)
	requirement : string =   undefined;

    @range(1,2147483647)
	sortOrder : number =   undefined;

	theirRequirementDetailId : number =   0 ;

    @range(0,2147483647)
	projectRequirementId : number =   undefined;
	projectRequirement : ProjectRequirement  ;
	@nested(ProjectZoma)
	projectZomas: ProjectZoma[];


	projectModuleId : number =   undefined;
	previousTheirRequirementId : number =   undefined;
	previousTheirRequirementDetailSortOrder : number =   undefined;

}
