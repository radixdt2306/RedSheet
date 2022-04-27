import { required, maxLength, range, nested } from '@rx/annotations';
import { EmailTemplateDetail, ModuleContent,  } from './'
export class LanguageContent {
    constructor(languageContent?: LanguageContent )  {
        let properties = [ "amharic", "bashkir", "contentType", "english", "languageContentId", "languageContentName", "zulu", "emailTemplateDetails", "moduleContents",];
        for (let property of properties)
            if (languageContent && languageContent[property])
                this[property] = languageContent[property];
    }
 
	amharic : string =   undefined;
 
	bashkir : string =   undefined;
 
    @maxLength(50)
	contentType : string =   undefined;
 
	english : string =   undefined;
 
	languageContentId : number =   0 ;
 
    @required()
    @maxLength(50)
	languageContentName : string =   undefined;
 
	zulu : string =   undefined;
	@nested(EmailTemplateDetail)
	emailTemplateDetails: EmailTemplateDetail[];

	@nested(ModuleContent)
	moduleContents: ModuleContent[];



}
