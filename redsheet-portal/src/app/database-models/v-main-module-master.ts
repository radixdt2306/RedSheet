import { required, maxLength, range, nested } from '@rx/annotations';

export class vMainModuleMaster {
    constructor(vMainModuleMaster?: vMainModuleMaster )  {
        let properties = [ "isRolePermissionItem", "moduleMasterId", "moduleMasterName",];
        for (let property of properties)
            if (vMainModuleMaster && vMainModuleMaster[property])
                this[property] = vMainModuleMaster[property];
    }
 
	isRolePermissionItem : boolean = false ;
 
	moduleMasterId : number =   0 ;
 
    @required()
    @maxLength(100)
	moduleMasterName : string =   undefined;


}
