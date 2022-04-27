import { required, maxLength, range, nested } from '@rx/annotations';

export class vEventPlanningActionRecord {
    constructor(vEventPlanningActionRecord?: vEventPlanningActionRecord )  {
        let properties = [ "eventPlanningActionBy", "eventPlanningActionDetail", "eventPlanningActionId", "eventPlanningActionOn", "projectPreparationId",];
        for (let property of properties)
            if (vEventPlanningActionRecord && vEventPlanningActionRecord[property])
                this[property] = vEventPlanningActionRecord[property];
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
