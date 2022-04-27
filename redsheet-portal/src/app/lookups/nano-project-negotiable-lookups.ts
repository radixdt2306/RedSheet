import { LookupAction } from '@rx/http'

export class NanoProjectNegotiableLookups {
    static tactics: LookupAction = {
        controllerName: "nanoprojectnegotiable",
        actionName: "tactics",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
