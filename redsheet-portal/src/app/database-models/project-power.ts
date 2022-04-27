import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, PowerTypeDetail, KnowledgeGatheringPlan,  vProjectPowerRecord  } from './'
export class ProjectPower {
    constructor(projectPower?: ProjectPower  | vProjectPowerRecord )  {
        let properties = [ "powerDetail", "projectPowerId", "projectModuleId", "powerTypeDetails", "knowledgeGatheringPlans",];
        for (let property of properties)
            if (projectPower && projectPower[property])
                this[property] = projectPower[property];
    }
 
    @required()
    @maxLength(500)
	powerDetail : string =   undefined;
 
	projectPowerId : number =   0 ;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
	@nested(PowerTypeDetail)
	powerTypeDetails: PowerTypeDetail[];

	@nested(KnowledgeGatheringPlan)
	knowledgeGatheringPlans: KnowledgeGatheringPlan[];



}
