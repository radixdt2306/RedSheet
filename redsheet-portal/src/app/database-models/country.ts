import { required, maxLength, range, nested } from '@rx/annotations';
import { State, CultureCountry, Culture,  } from './'
export class Country {
    constructor(country?: Country )  {
        let properties = [ "active", "countryCode", "countryId", "countryName", "currencyFormat", "dateFormat", "dateFormatSeperator", "decimalSeperator", "defaultLanguageId", "phoneFormat", "postalCodeFormat", "states", "cultureCountries", "cultures",];
        for (let property of properties)
            if (country && country[property])
                this[property] = country[property];
    }
 
	active : boolean = false ;
 
    @required()
    @maxLength(2)
	countryCode : string =   undefined;
 
	countryId : number =   0 ;
 
    @required()
    @maxLength(50)
	countryName : string =   undefined;
 
    @maxLength(20)
	currencyFormat : string =   undefined;
 
    @maxLength(20)
	dateFormat : string =   undefined;
 
    @maxLength(1)
	dateFormatSeperator : string =   undefined;
 
    @maxLength(10)
	decimalSeperator : string =   undefined;
 
    @range(1,2147483647)
	defaultLanguageId : number =   undefined;
 
    @maxLength(20)
	phoneFormat : string =   undefined;
 
    @maxLength(20)
	postalCodeFormat : string =   undefined;
	@nested(State)
	states: State[];

	@nested(CultureCountry)
	cultureCountries: CultureCountry[];

	@nested(Culture)
	cultures: Culture[];



}
