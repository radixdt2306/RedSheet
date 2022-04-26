import { required, maxLength, range } from '@rx/annotations';

export class RapportPlan {
    constructor(rapportPlan?: RapportPlan )  {
        let properties = [ "cultureCountryId", "rapportPlanId", "rapportPlanValue",];
        for (let property of properties)
            if (rapportPlan && rapportPlan[property])
                this[property] = rapportPlan[property];
    }
 
    @range(1,2147483647)
	cultureCountryId : number =   undefined;
 
	rapportPlanId : number =   0 ;
 
    @required()
    @maxLength(500)
	rapportPlanValue : string =   undefined;
}
