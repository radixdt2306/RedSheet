import { required, maxLength, range, nested } from '@rx/annotations';
import { vProjectImplementationPlanRecord } from './'
export class ProjectImplementationPlan {
    constructor(projectImplementationPlan?: ProjectImplementationPlan | vProjectImplementationPlanRecord) {
        let properties = ["activity", "endDate", "isEvent", "name", "projectImplementationPlanId", "projectModuleId", "startDate",];
        for (let property of properties)
            if (projectImplementationPlan && projectImplementationPlan[property])
                this[property] = projectImplementationPlan[property];
    }

    @maxLength(400)
    activity: string = undefined;

    endDate: Date = undefined;

    isEvent: boolean = false;

    @required()
    @maxLength(200)
    name: string = undefined;

    projectImplementationPlanId: number = 0;

    @range(1, 2147483647)
    projectModuleId: number = undefined;

    @required()
    startDate: Date = undefined;


}
