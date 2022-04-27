import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectEventTimelineRecord {
    constructor(vProjectEventTimelineRecord?: vProjectEventTimelineRecord )  {
        let properties = [ "endTime", "eventDuration", "isEndTimeFixed", "openingStatement", "projectEventTimelineId", "projectModuleId", "roomLayout", "startTime",];
        for (let property of properties)
            if (vProjectEventTimelineRecord && vProjectEventTimelineRecord[property])
                this[property] = vProjectEventTimelineRecord[property];
    }
 
    @required()
	endTime : Date =   undefined;
 
    @required()
    @maxLength(200)
	eventDuration : string =   undefined;
 
	isEndTimeFixed : boolean = false ;
 
    @required()
    @maxLength(1000)
	openingStatement : string =   undefined;
 
	projectEventTimelineId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @required()
    @maxLength(1000)
	roomLayout : string =   undefined;
 
    @required()
	startTime : Date =   undefined;


}
