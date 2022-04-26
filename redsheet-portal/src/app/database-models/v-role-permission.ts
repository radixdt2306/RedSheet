import { required, maxLength, range, nested } from '@rx/annotations';

export class vRolePermission {
    constructor(vRolePermission?: vRolePermission )  {
        let properties = [ "active", "applicationModuleId", "canAdd", "canDelete", "canEdit", "canView", "expr1", "isRolePermissionItem", "isRoot", "moduleMasterActive", "moduleMasterName", "parentApplicationModuleId", "roleId", "roleName", "rolePermissionId", "visibleActionItem",];
        for (let property of properties)
            if (vRolePermission && vRolePermission[property])
                this[property] = vRolePermission[property];
    }
 
	active : number =   undefined;
 
	applicationModuleId : number =   0 ;
 
	canAdd : boolean = false ;
 
	canDelete : boolean = false ;
 
	canEdit : boolean = false ;
 
	canView : boolean = false ;
 
    @range(1,2147483647)
	expr1 : number =   undefined;
 
	isRolePermissionItem : boolean = false ;
 
	isRoot : boolean = false ;
 
	moduleMasterActive : boolean = false ;
 
    @required()
    @maxLength(100)
	moduleMasterName : string =   undefined;
 
	parentApplicationModuleId : number =   undefined;
 
	roleId : number =   undefined;
 
    @maxLength(50)
	roleName : string =   undefined;
 
	rolePermissionId : number =   undefined;
 
    @required()
    @maxLength(1)
	visibleActionItem : string =   undefined;


}
