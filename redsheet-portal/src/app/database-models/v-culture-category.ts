import { required, maxLength, range, nested } from '@rx/annotations';

export class vCultureCategory {
    constructor(vCultureCategory?: vCultureCategory )  {
        let properties = [ "countryId", "cultureCategoryId", "cultureId", "isEgalitarian", "isIndividualistic", "isMonochronic", "isShortTerm", "projectCultureId",];
        for (let property of properties)
            if (vCultureCategory && vCultureCategory[property])
                this[property] = vCultureCategory[property];
    }
 
	countryId : number =   0 ;
 
    @range(1,2147483647)
	cultureCategoryId : number =   undefined;
 
    @range(1,2147483647)
	cultureId : number =   undefined;
 
	isEgalitarian : boolean = false ;
 
	isIndividualistic : boolean = false ;
 
	isMonochronic : boolean = false ;
 
	isShortTerm : boolean = false ;
 
    @range(1,2147483647)
	projectCultureId : number =   undefined;


}
