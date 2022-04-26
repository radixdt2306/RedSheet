import { required, maxLength, range, nested } from '@rx/annotations';

export class vTheirProjectRequirementRecord {
    constructor(vTheirProjectRequirementRecord?: vTheirProjectRequirementRecord )  {
        let properties = [ "projectModuleId", "projectRequirementId", "requirementCategoryId",];
        for (let property of properties)
            if (vTheirProjectRequirementRecord && vTheirProjectRequirementRecord[property])
                this[property] = vTheirProjectRequirementRecord[property];
    }
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectRequirementId : number =   undefined;
 
    @range(1,2147483647)
	requirementCategoryId : number =   undefined;


}
