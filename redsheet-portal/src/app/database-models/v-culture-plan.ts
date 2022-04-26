import { required, maxLength, range, nested } from '@rx/annotations';

export class vCulturePlan {
    constructor(vCulturePlan?: vCulturePlan )  {
        let properties = [ "culturePlanCategoryId", "culturePlanId", "culturePlanValue",];
        for (let property of properties)
            if (vCulturePlan && vCulturePlan[property])
                this[property] = vCulturePlan[property];
    }
 
    @range(1,2147483647)
	culturePlanCategoryId : number =   undefined;
 
	culturePlanId : number =   0 ;
 
    @required()
    @maxLength(1000)
	culturePlanValue : string =   undefined;


}
