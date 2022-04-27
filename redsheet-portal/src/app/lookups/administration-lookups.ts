import { LookupAction } from '@rx/http'

export class AdministrationLookups {
    static countries: LookupAction = {
        controllerName: "administration",
        actionName: "countries",	cacheOption: {
            isVersionBase: true,
            tableName:''
        }        
    };

}
