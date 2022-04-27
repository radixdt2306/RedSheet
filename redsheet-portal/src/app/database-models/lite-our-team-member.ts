import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteProjectBackground,  vLiteOurTeamMemberRecord  } from './'
export class LiteOurTeamMember {
    constructor(liteOurTeamMember?: LiteOurTeamMember  | vLiteOurTeamMemberRecord )  {
        let properties = [ "liteOurTeamMemberId", "liteOurTeamMemberName", "personalityId", "position", "liteProjectBackgroundId",];
        for (let property of properties)
            if (liteOurTeamMember && liteOurTeamMember[property])
                this[property] = liteOurTeamMember[property];
    }
 
	liteOurTeamMemberId : number =   0 ;
 
    @required()
    @maxLength(50)
	liteOurTeamMemberName : string =   undefined;
 
    @range(1,2147483647)
	personalityId : number =   undefined;
 
    @required()
    @maxLength(50)
	position : string =   undefined;
 
    @range(0,2147483647)
	liteProjectBackgroundId : number =   undefined;
	liteProjectBackground : LiteProjectBackground  ;


}
