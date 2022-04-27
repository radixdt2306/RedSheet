import { required, maxLength, range, nested } from '@rx/annotations';

export class vActiveLanguage {
    constructor(vActiveLanguage?: vActiveLanguage )  {
        let properties = [ "active", "languageCode", "languageId", "languageName",];
        for (let property of properties)
            if (vActiveLanguage && vActiveLanguage[property])
                this[property] = vActiveLanguage[property];
    }
 
	active : boolean = false ;
 
    @required()
    @maxLength(2)
	languageCode : string =   undefined;
 
	languageId : number =   0 ;
 
    @required()
    @maxLength(100)
	languageName : string =   undefined;


}
