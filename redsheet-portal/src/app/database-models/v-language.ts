import { required, maxLength, range, nested } from '@rx/annotations';

export class vLanguage {
    constructor(vLanguage?: vLanguage )  {
        let properties = [ "active", "languageCode", "languageId", "languageName",];
        for (let property of properties)
            if (vLanguage && vLanguage[property])
                this[property] = vLanguage[property];
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
