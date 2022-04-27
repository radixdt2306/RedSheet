import { required, maxLength, range, nested } from '@rx/annotations';

export class vLanguageContentType {
    constructor(vLanguageContentType?: vLanguageContentType )  {
        let properties = [ "languageContentTypeId", "languageContentTypeName",];
        for (let property of properties)
            if (vLanguageContentType && vLanguageContentType[property])
                this[property] = vLanguageContentType[property];
    }
 
    @range(1,2147483647)
	languageContentTypeId : number =   undefined;
 
    @required()
    @maxLength(100)
	languageContentTypeName : string =   undefined;


}
