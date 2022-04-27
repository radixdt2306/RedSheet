import { required, maxLength, range, nested } from '@rx/annotations';

export class vTemplateModule {
    constructor(vTemplateModule?: vTemplateModule )  {
        let properties = [ "assigneeName", "ownerNote", "projectId", "projectModuleId", "reviewerName", "templateModuleId", "templateModuleName", "userId",];
        for (let property of properties)
            if (vTemplateModule && vTemplateModule[property])
                this[property] = vTemplateModule[property];
    }
 
	assigneeName : string =   undefined;
 
	ownerNote : string =   undefined;
 
	projectId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
	reviewerName : string =   undefined;
 
    @range(1,2147483647)
	templateModuleId : number =   undefined;
 
    @required()
    @maxLength(200)
	templateModuleName : string =   undefined;
 
	userId : number =   undefined;


}
