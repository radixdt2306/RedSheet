import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteTheirTeamMember {
    constructor(vLiteTheirTeamMember?: vLiteTheirTeamMember )  {
        let properties = [ "liteProjectBackgroundId", "liteTheirTeamMemberId", "liteTheirTeamMemberName", "personalityId", "personalityKeyText", "position",];
        for (let property of properties)
            if (vLiteTheirTeamMember && vLiteTheirTeamMember[property])
                this[property] = vLiteTheirTeamMember[property];
    }
 
	liteProjectBackgroundId : number =   0 ;
 
    @range(1,2147483647)
	liteTheirTeamMemberId : number =   undefined;
 
    @required()
    @maxLength(500)
	liteTheirTeamMemberName : string =   undefined;
 
    @range(1,2147483647)
	personalityId : number =   undefined;
 
    @maxLength(10)
	personalityKeyText : string =   undefined;
 
    @required()
    @maxLength(500)
	position : string =   undefined;


}
