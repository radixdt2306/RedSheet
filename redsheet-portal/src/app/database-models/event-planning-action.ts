import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectPreparation,  vEventPlanningActionRecord  } from './'
export class EventPlanningAction {
    constructor(eventPlanningAction?: EventPlanningAction  | vEventPlanningActionRecord )  {
        let properties = [ "eventPlanningActionBy", "eventPlanningActionDetail", "eventPlanningActionId", "eventPlanningActionOn", "projectPreparationId",];
        for (let property of properties)
            if (eventPlanningAction && eventPlanningAction[property])
                this[property] = eventPlanningAction[property];
    }

    @required()
    @maxLength(50)
	eventPlanningActionBy : string =   undefined;

    @required()
    @maxLength(400)
	eventPlanningActionDetail : string =   undefined;

	eventPlanningActionId : number =   0 ;

    @required()
	eventPlanningActionOn : Date =   undefined;

    @range(0,2147483647)
	projectPreparationId : number =   undefined;
	projectPreparation : ProjectPreparation  ;


}
