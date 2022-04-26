import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteMeetingManagement, vLiteEventPlanningActionRecord } from './'
export class LiteEventPlanningAction {
    constructor(liteEventPlanningAction?: LiteEventPlanningAction | vLiteEventPlanningActionRecord) {
        let properties = ["liteEventPlanningActionBy", "liteEventPlanningActionDetail", "liteEventPlanningActionId", "liteEventPlanningActionOn", "liteMeetingManagementId",];
        for (let property of properties)
            if (liteEventPlanningAction && liteEventPlanningAction[property])
                this[property] = liteEventPlanningAction[property];
    }

    @required()
    @maxLength(100)
    liteEventPlanningActionBy: string = undefined;

    @required()
    @maxLength(200)
    liteEventPlanningActionDetail: string = undefined;

    liteEventPlanningActionId: number = 0;

    @required()
    liteEventPlanningActionOn: Date = undefined;

    @range(0, 2147483647)
    liteMeetingManagementId: number = undefined;
    liteMeetingManagement: LiteMeetingManagement;


}
