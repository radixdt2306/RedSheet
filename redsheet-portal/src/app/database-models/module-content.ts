import { required, maxLength, range, nested } from '@rx/annotations';
import { ApplicationModule, LanguageContent,  } from './'
export class ModuleContent {
    constructor(moduleContent?: ModuleContent )  {
        let properties = [ "abkhazian", "action", "afar", "afrikaans", "amharic", "english", "french", "languageContentType", "moduleContentId", "serverMessageId", "zulu", "applicationModuleId", "languageContentId",];
        for (let property of properties)
            if (moduleContent && moduleContent[property])
                this[property] = moduleContent[property];
    }
 
	abkhazian : string =   undefined;
 
    @required()
    @maxLength(10)
	action : string =   undefined;
 
	afar : string =   undefined;
 
	afrikaans : string =   undefined;
 
	amharic : string =   undefined;
 
	english : string =   undefined;
 
	french : string =   undefined;
 
    @maxLength(20)
	languageContentType : string =   undefined;
 
	moduleContentId : number =   0 ;
 
	serverMessageId : number =   undefined;
 
	zulu : string =   undefined;
 
    @range(0,2147483647)
	applicationModuleId : number =   undefined;
	applicationModule : ApplicationModule  ;
 
    @range(0,2147483647)
	languageContentId : number =   undefined;
	languageContent : LanguageContent  ;


}
