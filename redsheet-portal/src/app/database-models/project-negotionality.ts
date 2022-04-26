import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, OurTeamMember,  vProjectNegotionalityRecord  } from './'
export class ProjectNegotionality {
    constructor(projectNegotionality?: ProjectNegotionality  | vProjectNegotionalityRecord )  {
        let properties = [ "isMarketDifficult", "isSpendLarge", "projectNegotionalityId", "negotionalityCategoryId", "projectModuleId", "ourTeamMembers",];
        for (let property of properties)
            if (projectNegotionality && projectNegotionality[property])
                this[property] = projectNegotionality[property];
    }
 
	isMarketDifficult : boolean = false ;
 
	isSpendLarge : boolean = false ;
 
	projectNegotionalityId : number =   0 ;
 
    @range(0,2147483647)
	negotionalityCategoryId : number =   undefined;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
	@nested(OurTeamMember)
	ourTeamMembers: OurTeamMember[];



}
