import { required, maxLength, range, nested } from '@rx/annotations';

export class vCultureCountry {
    constructor(vCultureCountry?: vCultureCountry )  {
        let properties = [ "countryId", "cultureCountryId", "isEgalitarian", "isIndividualistic", "isMonochronic", "isShortTerm",];
        for (let property of properties)
            if (vCultureCountry && vCultureCountry[property])
                this[property] = vCultureCountry[property];
    }
 
	countryId : number =   0 ;
 
    @range(1,2147483647)
	cultureCountryId : number =   undefined;
 
	isEgalitarian : boolean = false ;
 
	isIndividualistic : boolean = false ;
 
	isMonochronic : boolean = false ;
 
	isShortTerm : boolean = false ;


}
