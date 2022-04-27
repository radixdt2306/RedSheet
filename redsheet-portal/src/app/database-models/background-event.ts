import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectBackground,  vBackgroundEventRecord  } from './'
export class BackgroundEvent {
    constructor(backgroundEvent?: BackgroundEvent  | vBackgroundEventRecord )  {
        let properties = [ "backgroundEventId", "description", "endDate", "isEvent", "startDate", "title", "projectBackgroundId",];
        for (let property of properties)
            if (backgroundEvent && backgroundEvent[property])
                this[property] = backgroundEvent[property];
    }

	backgroundEventId : number =   0 ;

    @maxLength(1000)
	description : string =   undefined;

	endDate : Date =   undefined;

	isEvent : boolean = false ;

    @required()
	startDate : Date =   undefined;

    @required()
    @maxLength(100)
	title : string =   undefined;

    @range(0,2147483647)
	projectBackgroundId : number =   undefined;
	projectBackground : ProjectBackground  ;


}
