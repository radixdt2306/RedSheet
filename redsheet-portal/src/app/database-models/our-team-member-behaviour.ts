import { required, maxLength, range, nested } from '@rx/annotations';
import { OurTeamMember,  } from './'
export class OurTeamMemberBehaviour {
    constructor(ourTeamMemberBehaviour?: OurTeamMemberBehaviour )  {
        let properties = [ "ourTeamMemberBehaviourId", "agreeableId", "assertivenessId", "conflictStyleId", "consciousnessId", "emotionalCompetenceId", "openMindedId", "ourTeamMemberId", "outingId", "personalCalmId", "solutionFocusedId", "wIllToWinId",];
        for (let property of properties)
            if (ourTeamMemberBehaviour && ourTeamMemberBehaviour[property])
                this[property] = ourTeamMemberBehaviour[property];
    }
 
	ourTeamMemberBehaviourId : number =   0 ;
 
    @range(0,2147483647)
	agreeableId : number =   undefined;
 
    @range(0,2147483647)
	assertivenessId : number =   undefined;
 
    @range(0,2147483647)
	conflictStyleId : number =   undefined;
 
    @range(0,2147483647)
	consciousnessId : number =   undefined;
 
    @range(0,2147483647)
	emotionalCompetenceId : number =   undefined;
 
    @range(0,2147483647)
	openMindedId : number =   undefined;
 
    @range(0,2147483647)
	ourTeamMemberId : number =   undefined;
	ourTeamMember : OurTeamMember  ;
 
    @range(0,2147483647)
	outingId : number =   undefined;
 
    @range(0,2147483647)
	personalCalmId : number =   undefined;
 
    @range(0,2147483647)
	solutionFocusedId : number =   undefined;
 
    @range(0,2147483647)
	wIllToWinId : number =   undefined;


}
