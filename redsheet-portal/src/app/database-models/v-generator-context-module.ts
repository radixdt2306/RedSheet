import { required, maxLength, range, nested } from '@rx/annotations';

export class vGeneratorContextModule {
    constructor(vGeneratorContextModule?: vGeneratorContextModule )  {
        let properties = [ "applicationModuleId", "isRoot", "moduleMasterId", "moduleMasterName", "parentApplicationModuleId",];
        for (let property of properties)
            if (vGeneratorContextModule && vGeneratorContextModule[property])
                this[property] = vGeneratorContextModule[property];
    }
 
	applicationModuleId : number =   0 ;
 
	isRoot : boolean = false ;
 
    @range(1,2147483647)
	moduleMasterId : number =   undefined;
 
    @required()
    @maxLength(100)
	moduleMasterName : string =   undefined;
 
	parentApplicationModuleId : number =   undefined;


}
