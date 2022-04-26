import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectCulturePlan {
    constructor(vProjectCulturePlan?: vProjectCulturePlan )  {
        let properties = [ "culturePlanCategoryId", "culturePlanId", "projectCulturePlanId", "projectCulturePlanValue", "projectModuleId",];
        for (let property of properties)
            if (vProjectCulturePlan && vProjectCulturePlan[property])
                this[property] = vProjectCulturePlan[property];
    }
 
	culturePlanCategoryId : number =   undefined;
 
	culturePlanId : number =   0 ;
 
    @range(1,2147483647)
	projectCulturePlanId : number =   undefined;
 
    @required()
    @maxLength(1000)
	projectCulturePlanValue : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;


}
