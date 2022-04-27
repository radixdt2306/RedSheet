import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, CommunicationPlan, EventPlanningAction, vProjectPreparationRecord } from './'
export class ProjectPreparation {
    constructor(projectPreparation?: ProjectPreparation | vProjectPreparationRecord) {
        let properties = ["elevatorSpeech", "preConditioningMessage", "projectPreparationId", "projectModuleId", "communicationPlans", "eventPlanningActions",];
        for (let property of properties)
            if (projectPreparation && projectPreparation[property])
                this[property] = projectPreparation[property];
    }

    @required()
    @maxLength(400)
    elevatorSpeech: string = undefined;

    @required()
    @maxLength(400)
    preConditioningMessage: string = undefined;

    projectPreparationId: number = 0;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;
    @nested(CommunicationPlan)
    communicationPlans: CommunicationPlan[];

    @nested(EventPlanningAction)
    eventPlanningActions: EventPlanningAction[];



}
