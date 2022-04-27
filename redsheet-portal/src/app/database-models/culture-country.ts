import { required, maxLength, range, nested } from '@rx/annotations';
import { Country,  } from './'
export class CultureCountry {
    constructor(cultureCountry?: CultureCountry )  {
        let properties = [ "cultureCountryId", "isEgalitarian", "isIndividualistic", "isMonochronic", "isShortTerm", "countryId",];
        for (let property of properties)
            if (cultureCountry && cultureCountry[property])
                this[property] = cultureCountry[property];
    }
 
	cultureCountryId : number =   0 ;
 
	isEgalitarian : boolean = false ;
 
	isIndividualistic : boolean = false ;
 
	isMonochronic : boolean = false ;
 
	isShortTerm : boolean = false ;
 
    @range(0,2147483647)
	countryId : number =   undefined;
	country : Country  ;


}
