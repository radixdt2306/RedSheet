import { required, maxLength, range, nested } from '@rx/annotations';

export class vEventAgendaTiming {
    constructor(vEventAgendaTiming?: vEventAgendaTiming )  {
        let properties = [ "eventAgendaTimingId", "negotiationPhase", "negotiationPhaseId", "payOff", "process", "projectEventTimelineId", "purpose", "sortOrder", "tacticsId", "tacticsToBeUsed", "time", "topic", "trigger",];
        for (let property of properties)
            if (vEventAgendaTiming && vEventAgendaTiming[property])
                this[property] = vEventAgendaTiming[property];
    }
 
	eventAgendaTimingId : number =   0 ;
 
    @required()
    @maxLength(100)
	negotiationPhase : string =   undefined;
 
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
    @maxLength(200)
	tacticsToBeUsed : string =   undefined;
 
    @required()
	time : Date =   undefined;
 
    @required()
    @maxLength(1000)
	topic : string =   undefined;
 
    @required()
    @maxLength(1000)
	trigger : string =   undefined;


}
