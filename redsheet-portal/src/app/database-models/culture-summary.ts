import { required, maxLength, range, nested } from '@rx/annotations';
import { ApplicationObject,  } from './'
export class CultureSummary {
    constructor(cultureSummary?: CultureSummary )  {
        let properties = [ "cultureSummaryId", "cultureSummaryText", "ourEgalitarian", "ourIndividualistic", "ourMonochronic", "ourShortTerm", "theirEgalitarian", "theirIndividualistic", "theirMonochronic", "theirShortTerm", "ourCultureCategoryId", "theirCultureCategoryId",];
        for (let property of properties)
            if (cultureSummary && cultureSummary[property])
                this[property] = cultureSummary[property];
    }
 
	cultureSummaryId : number =   0 ;
 
	cultureSummaryText : string =   undefined;
 
	ourEgalitarian : boolean = false ;
 
	ourIndividualistic : boolean = false ;
 
	ourMonochronic : boolean = false ;
 
	ourShortTerm : boolean = false ;
 
	theirEgalitarian : boolean = false ;
 
	theirIndividualistic : boolean = false ;
 
	theirMonochronic : boolean = false ;
 
	theirShortTerm : boolean = false ;
 
    @range(0,2147483647)
	ourCultureCategoryId : number =   undefined;
	applicationObject : ApplicationObject  ;
 
    @range(0,2147483647)
	theirCultureCategoryId : number =   undefined;
	applicationObject1 : ApplicationObject  ;


}
