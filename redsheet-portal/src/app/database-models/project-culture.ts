import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, Culture, vProjectCultureRecord } from './'
export class ProjectCulture {
    constructor(projectCulture?: ProjectCulture | vProjectCultureRecord) {
        let properties = ["note", "projectCultureId", "projectModuleId", "cultures",];
        for (let property of properties)
            if (projectCulture && projectCulture[property])
                this[property] = projectCulture[property];
    }

    @maxLength(500)
    note: string = undefined;

    projectCultureId: number = 0;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;
    @nested(Culture)
    cultures: Culture[];



}
