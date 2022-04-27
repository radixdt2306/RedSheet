import { required, maxLength, range, nested } from '@rx/annotations';

export class vLanguageContentName {
    constructor(vLanguageContentName?: vLanguageContentName )  {
        let properties = [ "english", "languageContentId", "languageContentName",];
        for (let property of properties)
            if (vLanguageContentName && vLanguageContentName[property])
                this[property] = vLanguageContentName[property];
    }
 
	english : string =   undefined;
 
	languageContentId : number =   0 ;
 
    @required()
    @maxLength(50)
	languageContentName : string =   undefined;


}
