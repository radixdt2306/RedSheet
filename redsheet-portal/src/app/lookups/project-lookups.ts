import { LookupAction } from '@rx/http'

export class ProjectLookups {
    static templateGroups: LookupAction = {
        controllerName: "project",
        actionName: "templateGroups",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static projectModuleAssigneesOrReviewerGroups: LookupAction = {
        controllerName: "project",
        actionName: "projectModuleAssigneesOrReviewerGroups",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };
}
