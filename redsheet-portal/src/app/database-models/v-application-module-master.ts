import { required, maxLength, range, nested } from '@rx/annotations';

export class vApplicationModuleMaster {
    constructor(vApplicationModuleMaster?: vApplicationModuleMaster )  {
        let properties = [ "applicationModuleId", "isRoot", "moduleMasterId", "moduleMasterName", "parentApplicationModuleId", "visibleActionItem",];
        for (let property of properties)
            if (vApplicationModuleMaster && vApplicationModuleMaster[property])
                this[property] = vApplicationModuleMaster[property];
    }
 
	applicationModuleId : number =   0 ;
 
	isRoot : boolean = false ;
 
    @range(1,2147483647)
	moduleMasterId : number =   undefined;
 
    @required()
    @maxLength(100)
	moduleMasterName : string =   undefined;
 
	parentApplicationModuleId : number =   undefined;
 
    @required()
    @maxLength(1)
	visibleActionItem : string =   undefined;


}
