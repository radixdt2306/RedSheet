import { required, maxLength, range, nested } from '@rx/annotations';
import { ApplicationModule,  } from './'
export class ModuleMaster {
    constructor(moduleMaster?: ModuleMaster )  {
        let properties = [ "active", "isRolePermissionItem", "isRoot", "moduleMasterId", "moduleMasterName", "applicationModules",];
        for (let property of properties)
            if (moduleMaster && moduleMaster[property])
                this[property] = moduleMaster[property];
    }
 
	active : boolean = false ;
 
	isRolePermissionItem : boolean = false ;
 
	isRoot : boolean = false ;
 
	moduleMasterId : number =   0 ;
 
    @required()
    @maxLength(100)
	moduleMasterName : string =   undefined;
	@nested(ApplicationModule)
	applicationModules: ApplicationModule[];



}
