import { required, maxLength, range, nested } from '@rx/annotations';

export class vArrivalAndOpeningTactic {
    constructor(vArrivalAndOpeningTactic?: vArrivalAndOpeningTactic )  {
        let properties = [ "arrivalAndOpeningTacticId", "arrivalAndOpeningTacticValue", "projectEventTimelineId",];
        for (let property of properties)
            if (vArrivalAndOpeningTactic && vArrivalAndOpeningTactic[property])
                this[property] = vArrivalAndOpeningTactic[property];
    }
 
	arrivalAndOpeningTacticId : number =   0 ;
 
    @required()
    @maxLength(1000)
	arrivalAndOpeningTacticValue : string =   undefined;
 
    @range(1,2147483647)
	projectEventTimelineId : number =   undefined;


}
