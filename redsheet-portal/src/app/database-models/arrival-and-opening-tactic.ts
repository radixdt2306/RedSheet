import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectEventTimeline,  } from './'
export class ArrivalAndOpeningTactic {
    constructor(arrivalAndOpeningTactic?: ArrivalAndOpeningTactic )  {
        let properties = [ "arrivalAndOpeningTacticId", "arrivalAndOpeningTacticValue", "projectEventTimelineId",];
        for (let property of properties)
            if (arrivalAndOpeningTactic && arrivalAndOpeningTactic[property])
                this[property] = arrivalAndOpeningTactic[property];
    }
 
	arrivalAndOpeningTacticId : number =   0 ;
 
    @required()
    @maxLength(200)
	arrivalAndOpeningTacticValue : string =   undefined;
 
    @range(0,2147483647)
	projectEventTimelineId : number =   undefined;
	projectEventTimeline : ProjectEventTimeline  ;


}
