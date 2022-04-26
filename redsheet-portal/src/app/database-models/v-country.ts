import { required, maxLength, range, nested } from '@rx/annotations';

export class vCountry {
    constructor(vCountry?: vCountry )  {
        let properties = [ "countryId", "countryName",];
        for (let property of properties)
            if (vCountry && vCountry[property])
                this[property] = vCountry[property];
    }
 
	countryId : number =   0 ;
 
    @required()
    @maxLength(50)
	countryName : string =   undefined;


}
