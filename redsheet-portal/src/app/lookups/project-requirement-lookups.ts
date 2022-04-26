import { LookupAction } from '@rx/http'

export class ProjectRequirementLookups {
    static batnaDetails: LookupAction = {
        controllerName: "projectrequirement",
        actionName: "batnaDetails",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
