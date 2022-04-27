import { 
	Personality,
	vTheirTeamMemberRecord,
	TheirTeamMember,
} from 'app/database-models';

export class TheirTeamMemberLookupGroup {
	personalities : Personality[];
	vTheirTeamMemberRecord : vTheirTeamMemberRecord;
	theirTeamMember : TheirTeamMember;
}
