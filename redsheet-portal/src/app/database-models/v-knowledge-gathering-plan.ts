import { required, maxLength, range, nested } from '@rx/annotations';

export class vKnowledgeGatheringPlan {
    constructor(vKnowledgeGatheringPlan?: vKnowledgeGatheringPlan )  {
        let properties = [ "knowledgeGatheringPlanId", "knowledgeGivenBy", "knowledgeGivenOn", "knowledgeRequired", "projectPowerId", "source",];
        for (let property of properties)
            if (vKnowledgeGatheringPlan && vKnowledgeGatheringPlan[property])
                this[property] = vKnowledgeGatheringPlan[property];
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
    @maxLength(1000)
	source : string =   undefined;


}
