import { 
	Personality,
	vUserLookup,
	vLiteOurTeamMemberRecord,
	LiteOurTeamMember,
} from 'app/database-models';

export class LiteOurTeamMemberLookupGroup {
	personalities : Personality[];
	userLookups : vUserLookup[];
	vLiteOurTeamMemberRecord : vLiteOurTeamMemberRecord;
	liteOurTeamMember : LiteOurTeamMember;
}
