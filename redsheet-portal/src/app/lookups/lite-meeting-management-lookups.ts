import { LookupAction } from '@rx/http'

export class LiteMeetingManagementLookups {
    static tactics: LookupAction = {
        controllerName: "litemeetingmanagement",
        actionName: "tactics",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
