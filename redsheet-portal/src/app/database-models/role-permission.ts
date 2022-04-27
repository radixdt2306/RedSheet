import { required, maxLength, range, nested } from '@rx/annotations';
import { ApplicationModule, Role,  } from './'
export class RolePermission {
    constructor(rolePermission?: RolePermission )  {
        let properties = [ "canAdd", "canDelete", "canEdit", "canView", "rolePermissionId", "applicationModuleId", "roleId",];
        for (let property of properties)
            if (rolePermission && rolePermission[property])
                this[property] = rolePermission[property];
    }
 
	canAdd : boolean = false ;
 
	canDelete : boolean = false ;
 
	canEdit : boolean = false ;
 
	canView : boolean = false ;
 
	rolePermissionId : number =   0 ;
 
    @range(0,2147483647)
	applicationModuleId : number =   undefined;
	applicationModule : ApplicationModule  ;
 
    @range(0,2147483647)
	roleId : number =   undefined;
	role : Role  ;


}
