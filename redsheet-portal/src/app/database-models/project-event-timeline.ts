import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, ArrivalAndOpeningTactic, EventAgendaTiming,  vProjectEventTimelineRecord  } from './'
export class ProjectEventTimeline {
    constructor(projectEventTimeline?: ProjectEventTimeline  | vProjectEventTimelineRecord )  {
        let properties = [ "endTime", "eventDuration", "isEndTimeFixed", "openingStatement", "projectEventTimelineId", "roomLayout", "startTime", "projectModuleId", "arrivalAndOpeningTactics", "eventAgendaTimings",];
        for (let property of properties)
            if (projectEventTimeline && projectEventTimeline[property])
                this[property] = projectEventTimeline[property];
    }

    @required()
	endTime : Date =   undefined;

    @required()
    @maxLength(10)
	eventDuration : string =   undefined;

	isEndTimeFixed : boolean = false ;

    @required()
    @maxLength(200)
	openingStatement : string =   undefined;

	projectEventTimelineId : number =   0 ;

    @required()
    @maxLength(350)
	roomLayout : string =   undefined;

    @required()
	startTime : Date =   undefined;

    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
	@nested(ArrivalAndOpeningTactic)
	arrivalAndOpeningTactics: ArrivalAndOpeningTactic[];

	@nested(EventAgendaTiming)
	eventAgendaTimings: EventAgendaTiming[];



}
