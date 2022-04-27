import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectRequirement, ProjectZoma,  vOurRequirementDetailRecord  } from './'
export class OurRequirementDetail {
    constructor(ourRequirementDetail?: OurRequirementDetail  | vOurRequirementDetailRecord )  {
        let properties = [ "fourStep", "ldo", "mdo", "ourRequirementDetailId", "requirement", "secondStep", "thirdStep", "painFactorId", "projectRequirementId", "projectZomas", "projectModuleId",];
        for (let property of properties)
            if (ourRequirementDetail && ourRequirementDetail[property])
                this[property] = ourRequirementDetail[property];
    }

    @maxLength(150)
	fourStep : string =   undefined;

    @required()
    @maxLength(150)
	ldo : string =   undefined;

    @required()
    @maxLength(150)
	mdo : string =   undefined;

	ourRequirementDetailId : number =   0 ;

    @required()
    @maxLength(150)
	requirement : string =   undefined;

    @maxLength(150)
	secondStep : string =   undefined;

    @maxLength(150)
	thirdStep : string =   undefined;

    @range(0,2147483647)
	painFactorId : number =   undefined;

    @range(0,2147483647)
	projectRequirementId : number =   undefined;
	projectRequirement : ProjectRequirement  ;
	@nested(ProjectZoma)
	projectZomas: ProjectZoma[];


	projectModuleId : number =   undefined;

}
