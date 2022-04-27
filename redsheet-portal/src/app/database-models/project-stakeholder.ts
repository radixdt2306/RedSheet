import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, StakeholderType, StakeholderCommunicationMode, vProjectStakeholderRecord } from './'
export class ProjectStakeholder {
    constructor(projectStakeholder?: ProjectStakeholder | vProjectStakeholderRecord) {
        let properties = ["frequancy", "projectStakeholderId", "stakeholderName", "projectModuleId", "stakeholderTypeId", "stakeholderCommunicationModes",];
        for (let property of properties)
            if (projectStakeholder && projectStakeholder[property])
                this[property] = projectStakeholder[property];
    }

    @required()
    @maxLength(200)
    frequancy: string = undefined;

    projectStakeholderId: number = 0;

    @required()
    @maxLength(100)
    stakeholderName: string = undefined;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;

    @range(0, 2147483647)
    stakeholderTypeId: number = undefined;
    stakeholderType: StakeholderType;
    @nested(StakeholderCommunicationMode)
    stakeholderCommunicationModes: StakeholderCommunicationMode[];



}
