import { required, maxLength, range, nested } from '@rx/annotations';

export class vKnowledgeGatheringPlanRecord {
    constructor(vKnowledgeGatheringPlanRecord?: vKnowledgeGatheringPlanRecord )  {
        let properties = [ "knowledgeGatheringPlanId", "knowledgeGivenBy", "knowledgeGivenOn", "knowledgeRequired", "projectPowerId", "source",];
        for (let property of properties)
            if (vKnowledgeGatheringPlanRecord && vKnowledgeGatheringPlanRecord[property])
                this[property] = vKnowledgeGatheringPlanRecord[property];
    }
 
	knowledgeGatheringPlanId : number =   0 ;
 
    @required()
    @maxLength(1000)
	knowledgeGivenBy : string =   undefined;
 
    @required()
	knowledgeGivenOn : Date =   undefined;
 
    @required()
    @maxLength(1000)
	knowledgeRequired : string =   undefined;
 
    @range(1,2147483647)
	projectPowerId : number =   undefined;
 
    @required()
    @maxLength(150)
	source : string =   undefined;


}
