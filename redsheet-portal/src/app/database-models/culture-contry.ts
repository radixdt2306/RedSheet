import { required, maxLength, range } from '@rx/annotations';
import { Country,  } from './'
export class CultureContry {
    constructor(cultureContry?: CultureContry )  {
        let properties = [ "cultureCountryId", "isEgalitarian", "isIndividualistic", "isMonochronic", "isShortTerm", "countryId",];
        for (let property of properties)
            if (cultureContry && cultureContry[property])
                this[property] = cultureContry[property];
    }
 
	cultureCountryId : number =   0 ;
 
	isEgalitarian : boolean = false ;
 
	isIndividualistic : boolean = false ;
 
	isMonochronic : boolean = false ;
 
	isShortTerm : boolean = false ;
 
	countryId : number =   undefined;
	country : Country  ;
}
