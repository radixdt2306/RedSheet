import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoDiscussionSequenceRecord {
    constructor(vNanoDiscussionSequenceRecord?: vNanoDiscussionSequenceRecord )  {
        let properties = [ "nanoDiscussionSequenceId", "negotiationPhaseId", "process", "projectModuleId", "sortOrder", "tacticId", "time",];
        for (let property of properties)
            if (vNanoDiscussionSequenceRecord && vNanoDiscussionSequenceRecord[property])
                this[property] = vNanoDiscussionSequenceRecord[property];
    }
 
	nanoDiscussionSequenceId : number =   0 ;
 
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
	time : Date =   undefined;


}
