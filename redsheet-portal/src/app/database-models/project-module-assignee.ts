import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, User, } from './'
export class ProjectModuleAssignee {
    constructor(projectModuleAssignee?: ProjectModuleAssignee) {
        let properties = ["projectModuleAssigneeId", "projectModuleId", "userId", "isChecked",];
        for (let property of properties)
            if (projectModuleAssignee && projectModuleAssignee[property])
                this[property] = projectModuleAssignee[property];
    }

    projectModuleAssigneeId: number = 0;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;

    @range(0, 2147483647)
    userId: number = undefined;
    user: User;

    isChecked: boolean = undefined;

}
