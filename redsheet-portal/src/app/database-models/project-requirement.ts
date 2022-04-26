import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, TheirRequirementDetail, OurRequirementDetail, TheirBatna, Ourbatna,  } from './'
export class ProjectRequirement {
    constructor(projectRequirement?: ProjectRequirement )  {
        let properties = [ "isZoma", "ourStrategy", "projectRequirementId", "projectModuleId", "requirementCategoryId", "theirRequirementDetails", "ourRequirementDetails", "theirBatnas", "ourbatnas",];
        for (let property of properties)
            if (projectRequirement && projectRequirement[property])
                this[property] = projectRequirement[property];
    }
 
	isZoma : boolean = false ;
 
	@required()
    @maxLength(500)
	ourStrategy : string =   undefined;
 
	projectRequirementId : number =   0 ;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
 
    @range(0,2147483647)
	requirementCategoryId : number =   undefined;
	@nested(TheirRequirementDetail)
	theirRequirementDetails: TheirRequirementDetail[];

	@nested(OurRequirementDetail)
	ourRequirementDetails: OurRequirementDetail[];

	@nested(TheirBatna)
	theirBatnas: TheirBatna[];

	@nested(Ourbatna)
	ourbatnas: Ourbatna[];



}
