import { LookupAction } from '@rx/http'

export class ProjectModuleLookups {
    static projectModuleAssignees: LookupAction = {
        controllerName: "projectmodule",
        actionName: "projectModuleAssignees",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static projectModuleReviewers: LookupAction = {
        controllerName: "projectmodule",
        actionName: "projectModuleReviewers",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static tactics: LookupAction = {
        controllerName: "projectmodule",
        actionName: "tactics",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static templateModules: LookupAction = {
        controllerName: "projectmodule",
        actionName: "templateModules",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
