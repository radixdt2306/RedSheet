import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, LiteMeetingManagementTiming, LiteEventPlanningAction, LiteMeetingPlanning, vLiteMeetingManagementRecord } from './'
export class LiteMeetingManagement {
    constructor(liteMeetingManagement?: LiteMeetingManagement | vLiteMeetingManagementRecord) {
        let properties = ["intangiblePowerPlan", "liteMeetingManagementId", "openingStatement", "preMeetingConditioning", "projectModuleId", "liteMeetingManagementTimings", "liteEventPlanningActions", "liteMeetingPlannings",];
        for (let property of properties)
            if (liteMeetingManagement && liteMeetingManagement[property])
                this[property] = liteMeetingManagement[property];
    }

    @required()
    @maxLength(400)
    intangiblePowerPlan: string = undefined;

    liteMeetingManagementId: number = 0;

    @required()
    @maxLength(200)
    openingStatement: string = undefined;

    @required()
    @maxLength(400)
    preMeetingConditioning: string = undefined;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;
    @nested(LiteMeetingManagementTiming)
    liteMeetingManagementTimings: LiteMeetingManagementTiming[];

    @nested(LiteEventPlanningAction)
    liteEventPlanningActions: LiteEventPlanningAction[];

    @nested(LiteMeetingPlanning)
    liteMeetingPlannings: LiteMeetingPlanning[];



}
