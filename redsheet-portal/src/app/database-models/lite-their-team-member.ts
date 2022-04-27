import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteProjectBackground,  vLiteTheirTeamMemberRecord  } from './'
export class LiteTheirTeamMember {
    constructor(liteTheirTeamMember?: LiteTheirTeamMember  | vLiteTheirTeamMemberRecord )  {
        let properties = [ "liteTheirTeamMemberId", "liteTheirTeamMemberName", "personalityId", "position", "liteProjectBackgroundId",];
        for (let property of properties)
            if (liteTheirTeamMember && liteTheirTeamMember[property])
                this[property] = liteTheirTeamMember[property];
    }

	liteTheirTeamMemberId : number =   0 ;

    @required()
    @maxLength(50)
	liteTheirTeamMemberName : string =   undefined;

    @range(1,2147483647)
	personalityId : number =   undefined;

    @required()
    @maxLength(50)
	position : string =   undefined;

    @range(0,2147483647)
	liteProjectBackgroundId : number =   undefined;
	liteProjectBackground : LiteProjectBackground  ;


}
