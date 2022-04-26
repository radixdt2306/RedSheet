import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteEventPlanningActionRecord {
    constructor(vLiteEventPlanningActionRecord?: vLiteEventPlanningActionRecord )  {
        let properties = [ "liteEventPlanningActionBy", "liteEventPlanningActionDetail", "liteEventPlanningActionId", "liteEventPlanningActionOn", "liteMeetingManagementId",];
        for (let property of properties)
            if (vLiteEventPlanningActionRecord && vLiteEventPlanningActionRecord[property])
                this[property] = vLiteEventPlanningActionRecord[property];
    }
 
    @required()
    @maxLength(50)
	liteEventPlanningActionBy : string =   undefined;
 
    @required()
    @maxLength(250)
	liteEventPlanningActionDetail : string =   undefined;
 
	liteEventPlanningActionId : number =   0 ;
 
    @required()
	liteEventPlanningActionOn : Date =   undefined;
 
    @range(1,2147483647)
	liteMeetingManagementId : number =   undefined;


}
