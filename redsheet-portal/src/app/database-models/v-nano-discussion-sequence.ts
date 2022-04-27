import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoDiscussionSequence {
    constructor(vNanoDiscussionSequence?: vNanoDiscussionSequence )  {
        let properties = [ "nanoDiscussionSequenceId", "negotiationPhase", "negotiationPhaseId", "process", "projectModuleId", "sortOrder", "tacticId", "tacticName", "time",];
        for (let property of properties)
            if (vNanoDiscussionSequence && vNanoDiscussionSequence[property])
                this[property] = vNanoDiscussionSequence[property];
    }
 
	nanoDiscussionSequenceId : number =   0 ;
 
    @required()
    @maxLength(100)
	negotiationPhase : string =   undefined;
 
    @range(1,2147483647)
	negotiationPhaseId : number =   undefined;
 
    @required()
    @maxLength(1000)
	process : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @range(1,2147483647)
	sortOrder : number =   undefined;
 
    @range(1,2147483647)
	tacticId : number =   undefined;
 
    @required()
    @maxLength(200)
	tacticName : string =   undefined;
 
    @required()
	time : Date =   undefined;


}
