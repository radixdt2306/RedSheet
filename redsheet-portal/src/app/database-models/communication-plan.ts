import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectPreparation, vCommunicationPlanRecord } from './'
export class CommunicationPlan {
    constructor(communicationPlan?: CommunicationPlan | vCommunicationPlanRecord) {
        let properties = ["communicationPlanId", "mediaMeans", "message", "to", "projectPreparationId",];
        for (let property of properties)
            if (communicationPlan && communicationPlan[property])
                this[property] = communicationPlan[property];
    }

    communicationPlanId: number = 0;

    @required()
    @maxLength(100)
    mediaMeans: string = undefined;

    @required()
    @maxLength(200)
    message: string = undefined;

    @required()
    @maxLength(50)
    to: string = undefined;

    @range(0, 2147483647)
    projectPreparationId: number = undefined;
    projectPreparation: ProjectPreparation;


}
