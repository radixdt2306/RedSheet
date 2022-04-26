import { required, maxLength, range, nested } from '@rx/annotations';

export class vBackgroundEventRecord {
    constructor(vBackgroundEventRecord?: vBackgroundEventRecord )  {
        let properties = [ "backgroundEventId", "description", "endDate", "isEvent", "projectBackgroundId", "startDate", "title",];
        for (let property of properties)
            if (vBackgroundEventRecord && vBackgroundEventRecord[property])
                this[property] = vBackgroundEventRecord[property];
    }
 
	backgroundEventId : number =   0 ;
 
    @maxLength(1000)
	description : string =   undefined;
 
	endDate : Date =   undefined;
 
	isEvent : boolean = false ;
 
    @range(1,2147483647)
	projectBackgroundId : number =   undefined;
 
    @required()
	startDate : Date =   undefined;
 
    @required()
    @maxLength(100)
	title : string =   undefined;


}
