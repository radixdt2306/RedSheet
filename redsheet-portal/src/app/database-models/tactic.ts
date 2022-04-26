import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteMeetingManagementTiming, EventAgendaTiming, NanoDiscussionSequence,  } from './'
export class Tactic {
    constructor(tactic?: Tactic )  {
        let properties = [ "tacticId", "tacticName", "liteMeetingManagementTimings", "eventAgendaTimings", "nanoDiscussionSequences",];
        for (let property of properties)
            if (tactic && tactic[property])
                this[property] = tactic[property];
    }
 
	tacticId : number =   0 ;
 
    @required()
    @maxLength(200)
	tacticName : string =   undefined;
	@nested(LiteMeetingManagementTiming)
	liteMeetingManagementTimings: LiteMeetingManagementTiming[];

	@nested(EventAgendaTiming)
	eventAgendaTimings: EventAgendaTiming[];

	@nested(NanoDiscussionSequence)
	nanoDiscussionSequences: NanoDiscussionSequence[];



}
