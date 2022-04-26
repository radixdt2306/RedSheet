import { required, maxLength, range, nested } from '@rx/annotations';

export class vOurTeamMember {
    constructor(vOurTeamMember?: vOurTeamMember )  {
        let properties = [ "agreeableBehaviour", "agreeableRequire", "assertivenessBehaviour", "assertivenessChange", "assertivenessRequire", "changeAgreeable", "changeConsciousness", "changeOpenMindedId", "changeOuting", "changePersonalCalm", "changeSolutionFocused", "changeWIllToWin", "conflictStyleBehaviour", "conflictStyleChange", "conflictStyleRequire", "consciousnessBehaviour", "consciousnessRequire", "emotionalCompetenceBehaviour", "emotionalCompetenceChange", "emotionalCompetenceRequire", "openMindedBehaviour", "openMindedRequire", "ourTeamMemberId", "ourTeamMemberName", "outingBehaviour", "outingRequire", "personalCalmBehaviour", "personalCalmRequire", "projectNegotionalityId", "solutionFocusedBehaviour", "solutionFocusedRequire", "teamRoleId", "teamRoleName", "userId", "wIllToWinBehaviour", "willToWinRequire",];
        for (let property of properties)
            if (vOurTeamMember && vOurTeamMember[property])
                this[property] = vOurTeamMember[property];
    }
 
    @maxLength(1)
	agreeableBehaviour : string =   undefined;
 
    @maxLength(1)
	agreeableRequire : string =   undefined;
 
    @maxLength(50)
	assertivenessBehaviour : string =   undefined;
 
    @maxLength(50)
	assertivenessChange : string =   undefined;
 
    @maxLength(50)
	assertivenessRequire : string =   undefined;
 
	changeAgreeable : number =   undefined;
 
	changeConsciousness : number =   undefined;
 
	changeOpenMindedId : number =   undefined;
 
	changeOuting : number =   undefined;
 
	changePersonalCalm : number =   undefined;
 
	changeSolutionFocused : number =   undefined;
 
	changeWIllToWin : number =   undefined;
 
    @maxLength(50)
	conflictStyleBehaviour : string =   undefined;
 
    @maxLength(50)
	conflictStyleChange : string =   undefined;
 
    @maxLength(50)
	conflictStyleRequire : string =   undefined;
 
    @maxLength(1)
	consciousnessBehaviour : string =   undefined;
 
    @maxLength(1)
	consciousnessRequire : string =   undefined;
 
    @maxLength(50)
	emotionalCompetenceBehaviour : string =   undefined;
 
    @maxLength(50)
	emotionalCompetenceChange : string =   undefined;
 
    @maxLength(50)
	emotionalCompetenceRequire : string =   undefined;
 
    @maxLength(1)
	openMindedBehaviour : string =   undefined;
 
    @maxLength(1)
	openMindedRequire : string =   undefined;
 
	ourTeamMemberId : number =   0 ;
 
    @required()
    @maxLength(201)
	ourTeamMemberName : string =   undefined;
 
    @maxLength(1)
	outingBehaviour : string =   undefined;
 
    @maxLength(1)
	outingRequire : string =   undefined;
 
    @maxLength(1)
	personalCalmBehaviour : string =   undefined;
 
    @maxLength(1)
	personalCalmRequire : string =   undefined;
 
    @range(1,2147483647)
	projectNegotionalityId : number =   undefined;
 
    @maxLength(1)
	solutionFocusedBehaviour : string =   undefined;
 
    @maxLength(1)
	solutionFocusedRequire : string =   undefined;
 
    @range(1,2147483647)
	teamRoleId : number =   undefined;
 
    @required()
    @maxLength(200)
	teamRoleName : string =   undefined;
 
    @range(1,2147483647)
	userId : number =   undefined;
 
    @maxLength(1)
	wIllToWinBehaviour : string =   undefined;
 
    @maxLength(1)
	willToWinRequire : string =   undefined;


}
