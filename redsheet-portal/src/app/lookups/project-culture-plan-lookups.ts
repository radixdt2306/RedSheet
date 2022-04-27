import { LookupAction } from '@rx/http'

export class ProjectCulturePlanLookups {
    static culturePlans: LookupAction = {
        controllerName: "projectcultureplan",
        actionName: "culturePlans",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
