import { required, maxLength, range, nested } from '@rx/annotations';

export class vBackgroundEvent {
    constructor(vBackgroundEvent?: vBackgroundEvent )  {
        let properties = [ "backgroundEventId", "description", "endDate", "isEvent", "projectBackgroundId", "startDate", "title",];
        for (let property of properties)
            if (vBackgroundEvent && vBackgroundEvent[property])
                this[property] = vBackgroundEvent[property];
    }
 
	backgroundEventId : number =   0 ;
 
    @required()
    @maxLength(1000)
	description : string =   undefined;
 
	endDate : Date =   undefined;
 
	isEvent : boolean = false ;
 
    @range(1,2147483647)
	projectBackgroundId : number =   undefined;
 
    @required()
	startDate : Date =   undefined;
 
    @required()
    @maxLength(1012)
	title : string =   undefined;


}
