import { LookupAction } from '@rx/http'

export class ProjectCultureLookups {
    static countries: LookupAction = {
        controllerName: "projectculture",
        actionName: "countries",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static cultureCountries: LookupAction = {
        controllerName: "projectculture",
        actionName: "cultureCountries",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
