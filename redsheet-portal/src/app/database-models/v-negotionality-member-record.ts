import { required, maxLength, range, nested } from '@rx/annotations';

export class vNegotionalityMemberRecord {
    constructor(vNegotionalityMemberRecord?: vNegotionalityMemberRecord )  {
        let properties = [ "agreeableId", "assertivenessId", "conflictStyleId", "consciousnessId", "emotionalCompetenceId", "openMindedId", "ourTeamMemberBehaviourId", "ourTeamMemberId", "outingId", "projectNegotionalityId", "teamRoleId", "userId",];
        for (let property of properties)
            if (vNegotionalityMemberRecord && vNegotionalityMemberRecord[property])
                this[property] = vNegotionalityMemberRecord[property];
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
 
	ourTeamMemberBehaviourId : number =   0 ;
 
    @range(1,2147483647)
	ourTeamMemberId : number =   undefined;
 
    @range(1,2147483647)
	outingId : number =   undefined;
 
    @range(1,2147483647)
	projectNegotionalityId : number =   undefined;
 
    @range(1,2147483647)
	teamRoleId : number =   undefined;
 
    @range(1,2147483647)
	userId : number =   undefined;


}
