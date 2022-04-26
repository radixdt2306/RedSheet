import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectCulturePlanRecord {
    constructor(vProjectCulturePlanRecord?: vProjectCulturePlanRecord )  {
        let properties = [ "culturePlanCategoryId", "projectCulturePlanId", "projectCulturePlanValue", "projectModuleId",];
        for (let property of properties)
            if (vProjectCulturePlanRecord && vProjectCulturePlanRecord[property])
                this[property] = vProjectCulturePlanRecord[property];
    }
 
    @range(1,2147483647)
	culturePlanCategoryId : number =   undefined;
 
	projectCulturePlanId : number =   0 ;
 
    @required()
    @maxLength(200)
	projectCulturePlanValue : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;


}
