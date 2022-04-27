import { LookupAction } from '@rx/http'

export class ProjectNegotiationLookups {
    static personalities: LookupAction = {
        controllerName: "projectnegotiation",
        actionName: "personalities",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
