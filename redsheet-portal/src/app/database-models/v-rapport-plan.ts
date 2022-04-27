import { required, maxLength, range } from '@rx/annotations';

export class vRapportPlan {
    constructor(vRapportPlan?: vRapportPlan )  {
        let properties = [ "cultureCountryId", "rapportPlanId", "rapportPlanValue",];
        for (let property of properties)
            if (vRapportPlan && vRapportPlan[property])
                this[property] = vRapportPlan[property];
    }
 
	cultureCountryId : number =   0 ;
 
    @range(1,2147483647)
	rapportPlanId : number =   undefined;
 
    @required()
    @maxLength(500)
	rapportPlanValue : string =   undefined;
}
