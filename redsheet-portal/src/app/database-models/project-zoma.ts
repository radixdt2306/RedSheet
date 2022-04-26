import { required, maxLength, range, nested } from '@rx/annotations';
import { OurRequirementDetail, ProjectModule, TheirRequirementDetail,  } from './'
export class ProjectZoma {
    constructor(projectZoma?: ProjectZoma )  {
        let properties = [ "projectZomaId", "ourRequirementDetailId", "projectModuleId", "theirRequirementDetailId",];
        for (let property of properties)
            if (projectZoma && projectZoma[property])
                this[property] = projectZoma[property];
    }
 
	projectZomaId : number =   0 ;
 
    @range(0,2147483647)
	ourRequirementDetailId : number =   undefined;
	ourRequirementDetail : OurRequirementDetail  ;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
 
    @range(0,2147483647)
	theirRequirementDetailId : number =   undefined;
	theirRequirementDetail : TheirRequirementDetail  ;


}
