import { required, maxLength, range, nested } from '@rx/annotations';
import { Personality, ProjectNegotiation,  vTheirTeamMemberRecord  } from './'
export class TheirTeamMember {
    constructor(theirTeamMember?: TheirTeamMember  | vTheirTeamMemberRecord )  {
        let properties = [ "position", "theirTeamMemberId", "theirTeamMemberName", "personalityId", "projectNegotiationId",];
        for (let property of properties)
            if (theirTeamMember && theirTeamMember[property])
                this[property] = theirTeamMember[property];
    }

    @required()
    @maxLength(50)
	position : string =   undefined;

	theirTeamMemberId : number =   0 ;

    @required()
    @maxLength(50)
	theirTeamMemberName : string =   undefined;

    @range(0,2147483647)
	personalityId : number =   undefined;
	personality : Personality  ;

    @range(0,2147483647)
	projectNegotiationId : number =   undefined;
	projectNegotiation : ProjectNegotiation  ;


}
