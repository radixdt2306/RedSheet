import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteMeetingManagement,  vLiteMeetingPlanningRecord  } from './'
export class LiteMeetingPlanning {
    constructor(liteMeetingPlanning?: LiteMeetingPlanning  | vLiteMeetingPlanningRecord )  {
        let properties = [ "liteMeetingPlanningId", "liteMeetingPlanningValue", "liteMeetingManagementId",];
        for (let property of properties)
            if (liteMeetingPlanning && liteMeetingPlanning[property])
                this[property] = liteMeetingPlanning[property];
    }
 
	liteMeetingPlanningId : number =   0 ;
 
    @required()
    @maxLength(350)
	liteMeetingPlanningValue : string =   undefined;
 
    @range(0,2147483647)
	liteMeetingManagementId : number =   undefined;
	liteMeetingManagement : LiteMeetingManagement  ;


}
