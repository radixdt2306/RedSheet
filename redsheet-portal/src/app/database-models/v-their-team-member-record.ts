import { required, maxLength, range, nested } from '@rx/annotations';

export class vTheirTeamMemberRecord {
    constructor(vTheirTeamMemberRecord?: vTheirTeamMemberRecord )  {
        let properties = [ "description", "personalityColor", "personalityId", "personalityKey", "position", "projectNegotiationId", "theirTeamMemberId", "theirTeamMemberName",];
        for (let property of properties)
            if (vTheirTeamMemberRecord && vTheirTeamMemberRecord[property])
                this[property] = vTheirTeamMemberRecord[property];
    }
 
    @maxLength(1000)
	description : string =   undefined;
 
    @required()
    @maxLength(50)
	personalityColor : string =   undefined;
 
	personalityId : number =   0 ;
 
    @maxLength(50)
	personalityKey : string =   undefined;
 
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
