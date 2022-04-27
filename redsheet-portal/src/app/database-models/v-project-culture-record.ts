import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectCultureRecord {
    constructor(vProjectCultureRecord?: vProjectCultureRecord )  {
        let properties = [ "countryId", "cultureCategoryId", "cultureId", "isEgalitarian", "isIndividualistic", "isMonochronic", "isShortTerm", "projectCultureId",];
        for (let property of properties)
            if (vProjectCultureRecord && vProjectCultureRecord[property])
                this[property] = vProjectCultureRecord[property];
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
