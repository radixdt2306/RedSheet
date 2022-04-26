import { required, maxLength, range, nested } from '@rx/annotations';

export class vTheirTeamMember {
    constructor(vTheirTeamMember?: vTheirTeamMember )  {
        let properties = [ "personalityId", "personalityKeyText", "position", "projectNegotiationId", "theirTeamMemberId", "theirTeamMemberName",];
        for (let property of properties)
            if (vTheirTeamMember && vTheirTeamMember[property])
                this[property] = vTheirTeamMember[property];
    }
 
	personalityId : number =   0 ;
 
    @maxLength(10)
	personalityKeyText : string =   undefined;
 
    @required()
    @maxLength(500)
	position : string =   undefined;
 
    @range(1,2147483647)
	projectNegotiationId : number =   undefined;
 
    @range(1,2147483647)
	theirTeamMemberId : number =   undefined;
 
    @required()
    @maxLength(50)
	theirTeamMemberName : string =   undefined;


}
