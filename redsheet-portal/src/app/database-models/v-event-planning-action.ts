import { required, maxLength, range, nested } from '@rx/annotations';

export class vEventPlanningAction {
    constructor(vEventPlanningAction?: vEventPlanningAction )  {
        let properties = [ "eventPlanningActionBy", "eventPlanningActionDetail", "eventPlanningActionId", "eventPlanningActionOn", "projectPreparationId",];
        for (let property of properties)
            if (vEventPlanningAction && vEventPlanningAction[property])
                this[property] = vEventPlanningAction[property];
    }
 
    @required()
    @maxLength(1000)
	eventPlanningActionBy : string =   undefined;
 
    @required()
    @maxLength(1000)
	eventPlanningActionDetail : string =   undefined;
 
	eventPlanningActionId : number =   0 ;
 
    @required()
	eventPlanningActionOn : Date =   undefined;
 
    @range(1,2147483647)
	projectPreparationId : number =   undefined;


}
