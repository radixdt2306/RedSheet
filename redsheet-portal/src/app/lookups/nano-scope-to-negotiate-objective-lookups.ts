import { LookupAction } from '@rx/http'

export class NanoScopeToNegotiateObjectiveLookups {
    static communicationModes: LookupAction = {
        controllerName: "nanoscopetonegotiateobjective",
        actionName: "communicationModes",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static nanoRelationshipRequires: LookupAction = {
        controllerName: "nanoscopetonegotiateobjective",
        actionName: "nanoRelationshipRequires",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static nanoScopeToNegotiates: LookupAction = {
        controllerName: "nanoscopetonegotiateobjective",
        actionName: "nanoScopeToNegotiates",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

    static valueObjectives: LookupAction = {
        controllerName: "nanoscopetonegotiateobjective",
        actionName: "valueObjectives",
		cacheOption: {
            isVersionBase: true,
            tableName:''
        }
    };

}
