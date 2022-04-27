import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectNegotionality, TeamRole, User, OurTeamMemberRequire, OurTeamMemberBehaviour,  vOurTeamMemberRecord  } from './'
export class OurTeamMember {
    constructor(ourTeamMember?: OurTeamMember  | vOurTeamMemberRecord )  {
        let properties = [ "ourTeamMemberId", "projectNegotionalityId", "teamRoleId", "userId", "ourTeamMemberRequires", "ourTeamMemberBehaviours",];
        for (let property of properties)
            if (ourTeamMember && ourTeamMember[property])
                this[property] = ourTeamMember[property];
    }
 
	ourTeamMemberId : number =   0 ;
 
    @range(0,2147483647)
	projectNegotionalityId : number =   undefined;
	projectNegotionality : ProjectNegotionality  ;
 
    @range(0,2147483647)
	teamRoleId : number =   undefined;
	teamRole : TeamRole  ;
 
    @range(0,2147483647)
	userId : number =   undefined;
	user : User  ;
	@nested(OurTeamMemberRequire)
	ourTeamMemberRequires: OurTeamMemberRequire[];

	@nested(OurTeamMemberBehaviour)
	ourTeamMemberBehaviours: OurTeamMemberBehaviour[];



}
