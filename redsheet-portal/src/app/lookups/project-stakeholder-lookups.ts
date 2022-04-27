import { LookupAction } from '@rx/http'

export class ProjectStakeholderLookups {
    static communicationModes: LookupAction = {
        controllerName: "projectstakeholder",
        actionName: "communicationModes",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static stakeholderTypes: LookupAction = {
        controllerName: "projectstakeholder",
        actionName: "stakeholderTypes",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
