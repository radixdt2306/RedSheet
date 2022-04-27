import { required, maxLength, range, nested } from '@rx/annotations';

export class vArrivalAndOpeningTacticsRecord {
    constructor(vArrivalAndOpeningTacticsRecord?: vArrivalAndOpeningTacticsRecord )  {
        let properties = [ "arrivalAndOpeningTacticId", "arrivalAndOpeningTacticValue", "projectEventTimelineId",];
        for (let property of properties)
            if (vArrivalAndOpeningTacticsRecord && vArrivalAndOpeningTacticsRecord[property])
                this[property] = vArrivalAndOpeningTacticsRecord[property];
    }
 
	arrivalAndOpeningTacticId : number =   0 ;
 
    @required()
    @maxLength(1000)
	arrivalAndOpeningTacticValue : string =   undefined;
 
    @range(1,2147483647)
	projectEventTimelineId : number =   undefined;


}
