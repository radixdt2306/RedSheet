import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectNegotionalityRecord {
    constructor(vProjectNegotionalityRecord?: vProjectNegotionalityRecord )  {
        let properties = [ "isMarketDifficult", "isSpendLarge", "negotionalityCategoryId", "projectModuleId", "projectNegotionalityId",];
        for (let property of properties)
            if (vProjectNegotionalityRecord && vProjectNegotionalityRecord[property])
                this[property] = vProjectNegotionalityRecord[property];
    }
 
	isMarketDifficult : boolean = false ;
 
	isSpendLarge : boolean = false ;
 
    @range(1,2147483647)
	negotionalityCategoryId : number =   undefined;
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectNegotionalityId : number =   undefined;


}
