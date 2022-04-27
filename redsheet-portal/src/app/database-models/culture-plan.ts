import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectCulturePlan,  } from './'
export class CulturePlan {
    constructor(culturePlan?: CulturePlan )  {
        let properties = [ "cultureCountryId", "culturePlanId", "culturePlanValue", "culturePlanCategoryId", "projectCulturePlans",];
        for (let property of properties)
            if (culturePlan && culturePlan[property])
                this[property] = culturePlan[property];
    }
 
    @range(1,2147483647)
	cultureCountryId : number =   undefined;
 
	culturePlanId : number =   0 ;
 
    @required()
    @maxLength(1000)
	culturePlanValue : string =   undefined;
 
    @range(0,2147483647)
	culturePlanCategoryId : number =   undefined;
	@nested(ProjectCulturePlan)
	projectCulturePlans: ProjectCulturePlan[];



}
