import { Role, vApplicationModuleMaster, ModuleMaster } from "app/database-models";
import { ApplicationModule } from "app/models";

export class RolesLookupGroup {
    applicationModuleMasters:vApplicationModuleMaster[];
    //moduleMasters:ModuleMaster[];
    applicationModules: ApplicationModule[];
    mainModuleMasters:ModuleMaster[];
    roles:Role;
}

export class ApplicationModuleRolePermission {
    canAdd: boolean = false;
    canDelete: boolean = false;
    canEdit: boolean = false;
    canView: boolean = false;
    rolePermissionId: number = 0;
    id: number = 0;
    applicationModuleId: number = undefined;
    applicationModuleName: string = undefined;
    roleId: number = undefined;
}
