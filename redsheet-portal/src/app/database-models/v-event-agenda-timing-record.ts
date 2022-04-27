import { required, maxLength, range, nested } from '@rx/annotations';

export class vEventAgendaTimingRecord {
    constructor(vEventAgendaTimingRecord?: vEventAgendaTimingRecord )  {
        let properties = [ "eventAgendaTimingId", "negotiationPhaseId", "payOff", "process", "projectEventTimelineId", "purpose", "sortOrder", "tacticsId", "time", "topic", "trigger",];
        for (let property of properties)
            if (vEventAgendaTimingRecord && vEventAgendaTimingRecord[property])
                this[property] = vEventAgendaTimingRecord[property];
    }
 
	eventAgendaTimingId : number =   0 ;
 
    @range(1,2147483647)
	negotiationPhaseId : number =   undefined;
 
    @required()
    @maxLength(1000)
	payOff : string =   undefined;
 
    @required()
    @maxLength(1000)
	process : string =   undefined;
 
    @range(1,2147483647)
	projectEventTimelineId : number =   undefined;
 
    @required()
    @maxLength(1000)
	purpose : string =   undefined;
 
    @range(1,2147483647)
	sortOrder : number =   undefined;
 
    @range(1,2147483647)
	tacticsId : number =   undefined;
 
    @required()
	time : Date =   undefined;
 
    @required()
    @maxLength(1000)
	topic : string =   undefined;
 
    @required()
    @maxLength(1000)
	trigger : string =   undefined;


}
