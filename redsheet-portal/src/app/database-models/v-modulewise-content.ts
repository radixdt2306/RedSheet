import { required, maxLength, range, nested } from '@rx/annotations';

export class vModulewiseContent {
    constructor(vModulewiseContent?: vModulewiseContent )  {
        let properties = [ "action", "afar", "applicationModuleId", "english", "french", "languageContentId", "languageContentName", "languageContentType", "moduleContentId", "moduleMasterId", "moduleMasterName",];
        for (let property of properties)
            if (vModulewiseContent && vModulewiseContent[property])
                this[property] = vModulewiseContent[property];
    }
 
    @required()
    @maxLength(10)
	action : string =   undefined;
 
	afar : string =   undefined;
 
	applicationModuleId : number =   0 ;
 
	english : string =   undefined;
 
	french : string =   undefined;
 
    @range(1,2147483647)
	languageContentId : number =   undefined;
 
    @required()
    @maxLength(50)
	languageContentName : string =   undefined;
 
    @maxLength(20)
	languageContentType : string =   undefined;
 
    @range(1,2147483647)
	moduleContentId : number =   undefined;
 
    @range(1,2147483647)
	moduleMasterId : number =   undefined;
 
    @required()
    @maxLength(100)
	moduleMasterName : string =   undefined;


}
