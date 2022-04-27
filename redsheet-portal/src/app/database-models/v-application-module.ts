import { required, maxLength, range, nested } from '@rx/annotations';

export class vApplicationModule {
    constructor(vApplicationModule?: vApplicationModule )  {
        let properties = [ "applicationModuleId", "isRoot", "moduleMasterId", "moduleMasterName", "parentApplicationModuleId", "visibleActionItem",];
        for (let property of properties)
            if (vApplicationModule && vApplicationModule[property])
                this[property] = vApplicationModule[property];
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
