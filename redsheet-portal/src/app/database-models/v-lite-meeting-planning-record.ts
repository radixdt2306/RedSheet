import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteMeetingPlanningRecord {
    constructor(vLiteMeetingPlanningRecord?: vLiteMeetingPlanningRecord )  {
        let properties = [ "liteMeetingManagementId", "liteMeetingPlanningId", "liteMeetingPlanningValue",];
        for (let property of properties)
            if (vLiteMeetingPlanningRecord && vLiteMeetingPlanningRecord[property])
                this[property] = vLiteMeetingPlanningRecord[property];
    }
 
	liteMeetingManagementId : number =   0 ;
 
    @range(1,2147483647)
	liteMeetingPlanningId : number =   undefined;
 
    @required()
    @maxLength(1000)
	liteMeetingPlanningValue : string =   undefined;


}
