import { 
	Tactic,
	vNanoDiscussionSequenceRecord,
	NanoDiscussionSequence,
} from 'app/database-models';

export class NanoDiscussionSequenceLookupGroup {
	tactics : Tactic[];
	vNanoDiscussionSequenceRecord : vNanoDiscussionSequenceRecord;
	nanoDiscussionSequence : NanoDiscussionSequence;
}
