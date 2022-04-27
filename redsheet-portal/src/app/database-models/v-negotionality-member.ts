import { required, maxLength, range, nested } from '@rx/annotations';

export class vNegotionalityMember {
    constructor(vNegotionalityMember?: vNegotionalityMember )  {
        let properties = [ "agreeableId", "assertivenessId", "conflictStyleId", "consciousnessId", "emotionalCompetenceId", "openMindedId", "ourTeamMemberBehaviourId", "ourTeamMemberId", "ourTeamMemberRequireId", "outingId", "projectNegotionalityId", "requireAgreeableId", "requireAssertivenessId", "requireConflictStyleId", "requireConsciousnessId", "requireEmotionalCompetenceId", "requireOpenMindedId", "requireOutingId", "teamRoleId", "teamRoleName", "userId", "userName",];
        for (let property of properties)
            if (vNegotionalityMember && vNegotionalityMember[property])
                this[property] = vNegotionalityMember[property];
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
	ourTeamMemberRequireId : number =   undefined;
 
    @range(1,2147483647)
	outingId : number =   undefined;
 
    @range(1,2147483647)
	projectNegotionalityId : number =   undefined;
 
    @range(1,2147483647)
	requireAgreeableId : number =   undefined;
 
    @range(1,2147483647)
	requireAssertivenessId : number =   undefined;
 
    @range(1,2147483647)
	requireConflictStyleId : number =   undefined;
 
    @range(1,2147483647)
	requireConsciousnessId : number =   undefined;
 
    @range(1,2147483647)
	requireEmotionalCompetenceId : number =   undefined;
 
    @range(1,2147483647)
	requireOpenMindedId : number =   undefined;
 
    @range(1,2147483647)
	requireOutingId : number =   undefined;
 
    @range(1,2147483647)
	teamRoleId : number =   undefined;
 
    @required()
    @maxLength(200)
	teamRoleName : string =   undefined;
 
    @range(1,2147483647)
	userId : number =   undefined;
 
    @required()
    @maxLength(201)
	userName : string =   undefined;


}
