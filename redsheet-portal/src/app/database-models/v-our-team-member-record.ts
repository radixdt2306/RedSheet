import { required, maxLength, range, nested } from '@rx/annotations';

export class vOurTeamMemberRecord {
    constructor(vOurTeamMemberRecord?: vOurTeamMemberRecord )  {
        let properties = [ "agreeableId", "assertivenessId", "conflictStyleId", "consciousnessId", "emotionalCompetenceId", "openMindedId", "ourTeamMemberId", "outingId", "personalCalmId", "solutionFocusedId", "teamRoleId", "userId", "willToWinId",];
        for (let property of properties)
            if (vOurTeamMemberRecord && vOurTeamMemberRecord[property])
                this[property] = vOurTeamMemberRecord[property];
    }
 
    @range(1,2147483647)
	agreeableId : number =   undefined;
 
    @range(1,2147483647)
	assertivenessId : number =   undefined;
 
    @range(1,2147483647)
	conflictStyleId : number =   undefined;
 
    @range(1,2147483647)
	consciousnessId : number =   undefined;
 
    @range(1,2147483647)
	emotionalCompetenceId : number =   undefined;
 
    @range(1,2147483647)
	openMindedId : number =   undefined;
 
	ourTeamMemberId : number =   0 ;
 
    @range(1,2147483647)
	outingId : number =   undefined;
 
    @range(1,2147483647)
	personalCalmId : number =   undefined;
 
    @range(1,2147483647)
	solutionFocusedId : number =   undefined;
 
    @range(1,2147483647)
	teamRoleId : number =   undefined;
 
    @range(1,2147483647)
	userId : number =   undefined;
 
    @range(1,2147483647)
	willToWinId : number =   undefined;


}
