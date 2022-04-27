import { 
	Personality,
	vLiteTheirTeamMemberRecord,
	LiteTheirTeamMember,
} from 'app/database-models';

export class LiteTheirTeamMemberLookupGroup {
	personalities : Personality[];
	vLiteTheirTeamMemberRecord : vLiteTheirTeamMemberRecord;
	liteTheirTeamMember : LiteTheirTeamMember;
}
