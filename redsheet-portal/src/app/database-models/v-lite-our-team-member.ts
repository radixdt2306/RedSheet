import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteOurTeamMember {
    constructor(vLiteOurTeamMember?: vLiteOurTeamMember )  {
        let properties = [ "liteOurTeamMemberId", "liteOurTeamMemberName", "liteProjectBackgroundId", "personalityId", "personalityKeyText", "position",];
        for (let property of properties)
            if (vLiteOurTeamMember && vLiteOurTeamMember[property])
                this[property] = vLiteOurTeamMember[property];
    }
 
	liteOurTeamMemberId : number =   0 ;
 
    @required()
    @maxLength(50)
	liteOurTeamMemberName : string =   undefined;
 
    @range(1,2147483647)
	liteProjectBackgroundId : number =   undefined;
 
    @range(1,2147483647)
	personalityId : number =   undefined;
 
    @maxLength(10)
	personalityKeyText : string =   undefined;
 
    @required()
    @maxLength(50)
	position : string =   undefined;


}
