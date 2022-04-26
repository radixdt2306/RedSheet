import { LookupAction } from '@rx/http'

export class ProjectEventTimelineLookups {
    static tactics: LookupAction = {
        controllerName: "projecteventtimeline",
        actionName: "tactics",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
