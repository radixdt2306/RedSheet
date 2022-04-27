import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, vProjectPostEventActionRecord } from './'
export class ProjectPostEventAction {
    constructor(projectPostEventAction?: ProjectPostEventAction | vProjectPostEventActionRecord) {
        let properties = ["postEventActionBy", "postEventActionDetail", "postEventActionOn", "projectPostEventActionId", "projectModuleId",];
        for (let property of properties)
            if (projectPostEventAction && projectPostEventAction[property])
                this[property] = projectPostEventAction[property];
    }

    @required()
    @maxLength(50)
    postEventActionBy: string = undefined;

    @required()
    @maxLength(100)
    postEventActionDetail: string = undefined;

    @required()
    postEventActionOn: Date = undefined;

    projectPostEventActionId: number = 0;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;


}
