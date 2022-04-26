import { required, maxLength, range, nested } from '@rx/annotations';
import { Country, ProjectCulture,  } from './'
export class Culture {
    constructor(culture?: Culture )  {
        let properties = [ "cultureCategoryId", "cultureId", "isEgalitarian", "isIndividualistic", "isMonochronic", "isShortTerm", "countryId", "projectCultureId",];
        for (let property of properties)
            if (culture && culture[property])
                this[property] = culture[property];
    }
 
    @range(1,2147483647)
	cultureCategoryId : number =   undefined;
 
	cultureId : number =   0 ;
 
	isEgalitarian : boolean = false ;
 
	isIndividualistic : boolean = false ;
 
	isMonochronic : boolean = false ;
 
	isShortTerm : boolean = false ;
 
    @range(0,2147483647)
	countryId : number =   undefined;
	country : Country  ;
 
    @range(0,2147483647)
	projectCultureId : number =   undefined;
	projectCulture : ProjectCulture  ;


}
