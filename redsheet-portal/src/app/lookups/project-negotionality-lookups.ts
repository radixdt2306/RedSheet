import { LookupAction } from '@rx/http'

export class ProjectNegotionalityLookups {
    static teamRoles: LookupAction = {
        controllerName: "projectnegotionality",
        actionName: "teamRoles",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static userLookups: LookupAction = {
        controllerName: "projectnegotionality",
        actionName: "userLookups",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
