import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectPower, vKnowledgeGatheringPlanRecord } from './'
export class KnowledgeGatheringPlan {
    constructor(knowledgeGatheringPlan?: KnowledgeGatheringPlan | vKnowledgeGatheringPlanRecord) {
        let properties = ["knowledgeGatheringPlanId", "knowledgeGivenBy", "knowledgeGivenOn", "knowledgeRequired", "source", "projectPowerId",];
        for (let property of properties)
            if (knowledgeGatheringPlan && knowledgeGatheringPlan[property])
                this[property] = knowledgeGatheringPlan[property];
    }

    knowledgeGatheringPlanId: number = 0;

    @required()
    @maxLength(50)
    knowledgeGivenBy: string = undefined;

    @required()
    knowledgeGivenOn: Date = undefined;

    @required()
    @maxLength(250)
    knowledgeRequired: string = undefined;

    @required()
    @maxLength(150)
    source: string = undefined;

    @range(0, 2147483647)
    projectPowerId: number = undefined;
    projectPower: ProjectPower;


}
