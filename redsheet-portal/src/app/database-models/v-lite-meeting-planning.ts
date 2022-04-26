import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteMeetingPlanning {
    constructor(vLiteMeetingPlanning?: vLiteMeetingPlanning )  {
        let properties = [ "liteMeetingManagementId", "liteMeetingPlanningId", "liteMeetingPlanningValue",];
        for (let property of properties)
            if (vLiteMeetingPlanning && vLiteMeetingPlanning[property])
                this[property] = vLiteMeetingPlanning[property];
    }
 
	liteMeetingManagementId : number =   0 ;
 
    @range(1,2147483647)
	liteMeetingPlanningId : number =   undefined;
 
    @required()
    @maxLength(1000)
	liteMeetingPlanningValue : string =   undefined;


}
