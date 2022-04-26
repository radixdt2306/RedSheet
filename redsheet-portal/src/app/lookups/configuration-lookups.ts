import { LookupAction } from '@rx/http'

export class ConfigurationLookups {
    static countries: LookupAction = {
        controllerName: "configuration",
        actionName: "countries",
        cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
