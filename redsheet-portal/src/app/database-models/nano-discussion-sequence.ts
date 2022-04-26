import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, Tactic,  vNanoDiscussionSequenceRecord  } from './'
export class NanoDiscussionSequence {
    constructor(nanoDiscussionSequence?: NanoDiscussionSequence  | vNanoDiscussionSequenceRecord )  {
        let properties = [ "nanoDiscussionSequenceId", "process", "sortOrder", "time", "negotiationPhaseId", "projectModuleId", "tacticId", "previousNanoDiscussionSequenceId", "previousNanoDiscussionSequenceSortOrder", "previousNanoDiscussionSequenceTime",];
        for (let property of properties)
            if (nanoDiscussionSequence && nanoDiscussionSequence[property])
                this[property] = nanoDiscussionSequence[property];
    }

	nanoDiscussionSequenceId : number =   0 ;

    @required()
    @maxLength(400)
	process : string =   undefined;

    @range(1,2147483647)
	sortOrder : number =   undefined;

    @required()
	time : Date =   undefined;

    @range(0,2147483647)
	negotiationPhaseId : number =   undefined;

    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;

    @range(0,2147483647)
	tacticId : number =   undefined;
	tactic : Tactic  ;

	previousNanoDiscussionSequenceId : number =   undefined;
	previousNanoDiscussionSequenceSortOrder : number =   undefined;
	previousNanoDiscussionSequenceTime : string =   undefined;

}
