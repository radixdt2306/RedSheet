import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteOurTeamMemberRecord {
    constructor(vLiteOurTeamMemberRecord?: vLiteOurTeamMemberRecord )  {
        let properties = [ "liteOurTeamMemberId", "liteOurTeamMemberName", "liteProjectBackgroundId", "personalityId", "position",];
        for (let property of properties)
            if (vLiteOurTeamMemberRecord && vLiteOurTeamMemberRecord[property])
                this[property] = vLiteOurTeamMemberRecord[property];
    }
 
	liteOurTeamMemberId : number =   0 ;
 
    @required()
    @maxLength(50)
	liteOurTeamMemberName : string =   undefined;
 
    @range(1,2147483647)
	liteProjectBackgroundId : number =   undefined;
 
    @range(1,2147483647)
	personalityId : number =   undefined;
 
    @required()
    @maxLength(50)
	position : string =   undefined;


}
