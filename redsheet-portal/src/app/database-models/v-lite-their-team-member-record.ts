import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteTheirTeamMemberRecord {
    constructor(vLiteTheirTeamMemberRecord?: vLiteTheirTeamMemberRecord )  {
        let properties = [ "liteProjectBackgroundId", "liteTheirTeamMemberId", "liteTheirTeamMemberName", "personalityId", "position",];
        for (let property of properties)
            if (vLiteTheirTeamMemberRecord && vLiteTheirTeamMemberRecord[property])
                this[property] = vLiteTheirTeamMemberRecord[property];
    }
 
	liteProjectBackgroundId : number =   0 ;
 
    @range(1,2147483647)
	liteTheirTeamMemberId : number =   undefined;
 
    @required()
    @maxLength(500)
	liteTheirTeamMemberName : string =   undefined;
 
    @range(1,2147483647)
	personalityId : number =   undefined;
 
    @required()
    @maxLength(500)
	position : string =   undefined;


}
