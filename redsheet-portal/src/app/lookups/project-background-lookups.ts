import { LookupAction } from '@rx/http'

export class ProjectBackgroundLookups {
    static negotiationTypes: LookupAction = {
        controllerName: "projectbackground",
        actionName: "negotiationTypes",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static relationshipRequires: LookupAction = {
        controllerName: "projectbackground",
        actionName: "relationshipRequires",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static valueObjectives: LookupAction = {
        controllerName: "projectbackground",
        actionName: "valueObjectives",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
