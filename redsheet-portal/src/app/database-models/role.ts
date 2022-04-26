import { required, maxLength, range, nested } from '@rx/annotations';
import { RolePermission,  } from './'
export class Role {
    constructor(role?: Role )  {
        let properties = [ "roleId", "roleName", "status", "rolePermissions",];
        for (let property of properties)
            if (role && role[property])
                this[property] = role[property];
    }
 
	roleId : number =   0 ;
 
    @required()
    @maxLength(50)
	roleName : string =   undefined;
 
    @range(0,2147483647)
	status : number =   undefined;
	@nested(RolePermission)
	rolePermissions: RolePermission[];



}
