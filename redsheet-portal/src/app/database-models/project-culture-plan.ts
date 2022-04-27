import { required, maxLength, range, nested } from '@rx/annotations';
import { CulturePlan,  vProjectCulturePlanRecord  } from './'
export class ProjectCulturePlan {
    constructor(projectCulturePlan?: ProjectCulturePlan  | vProjectCulturePlanRecord )  {
        let properties = [ "projectCulturePlanId", "projectCulturePlanValue", "projectModuleId", "culturePlanCategoryId", "culturePlanId",];
        for (let property of properties)
            if (projectCulturePlan && projectCulturePlan[property])
                this[property] = projectCulturePlan[property];
    }
 
	projectCulturePlanId : number =   0 ;
 
    @required()
    @maxLength(200)
	projectCulturePlanValue : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
	culturePlanCategoryId : number =   undefined;
 
	culturePlanId : number =   undefined;
	culturePlan : CulturePlan  ;


}
