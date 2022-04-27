import { LookupAction } from '@rx/http'

export class LiteProjectBackgroundLookups {
    static communicationModes: LookupAction = {
        controllerName: "liteprojectbackground",
        actionName: "communicationModes",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static liteRelationshipRequires: LookupAction = {
        controllerName: "liteprojectbackground",
        actionName: "liteRelationshipRequires",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static personalities: LookupAction = {
        controllerName: "liteprojectbackground",
        actionName: "personalities",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static userLookups: LookupAction = {
        controllerName: "liteprojectbackground",
        actionName: "userLookups",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static valueObjectives: LookupAction = {
        controllerName: "liteprojectbackground",
        actionName: "valueObjectives",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
