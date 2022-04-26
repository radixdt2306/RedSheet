import { LookupAction } from '@rx/http'

export class ProjectPowerLookups {
    static powerTypes: LookupAction = {
        controllerName: "projectpower",
        actionName: "powerTypes",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
