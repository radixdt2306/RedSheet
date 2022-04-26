import { 
	TeamRole,
	OurTeamMember,
	vUserLookup,
} from 'app/database-models';

export class OurTeamMemberLookupGroup {
	teamRoles : TeamRole[];
	userLookups:vUserLookup[];
	ourTeamMember : OurTeamMember;
}
