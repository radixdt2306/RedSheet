import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteRelationshipRequire, ProjectModule, LiteBackgroundCommunicationMode, LiteTheirTeamMember, LiteTarget, LiteOurTeamMember,  vLiteProjectBackgroundRecord  } from './'
export class LiteProjectBackground {
    constructor(liteProjectBackground?: LiteProjectBackground  | vLiteProjectBackgroundRecord )  {
        let properties = [ "dateOfNegotiation", "focus", "knowAboutThem", "knownIssues", "liteProjectBackgroundId", "location", "opponentName", "reason", "valueObjectiveId", "liteRelationshipRequireId", "projectModuleId", "liteBackgroundCommunicationModes", "liteTheirTeamMembers", "liteTargets", "liteOurTeamMembers",];
        for (let property of properties)
            if (liteProjectBackground && liteProjectBackground[property])
                this[property] = liteProjectBackground[property];
    }

    @required()
	dateOfNegotiation : Date =   undefined;

    @required()
    @maxLength(200)
	focus : string =   undefined;

    @required()
    @maxLength(400)
	knowAboutThem : string =   undefined;

    @required()
    @maxLength(400)
	knownIssues : string =   undefined;

	liteProjectBackgroundId : number =   0 ;

    @required()
    @maxLength(50)
	location : string =   undefined;

    @required()
    @maxLength(100)
	opponentName : string =   undefined;

    @required()
    @maxLength(200)
	reason : string =   undefined;

    @range(1,2147483647)
	valueObjectiveId : number =   undefined;

    @range(0,2147483647)
	liteRelationshipRequireId : number =   undefined;
	liteRelationshipRequire : LiteRelationshipRequire  ;

    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
	@nested(LiteBackgroundCommunicationMode)
	liteBackgroundCommunicationModes: LiteBackgroundCommunicationMode[];

	@nested(LiteTheirTeamMember)
	liteTheirTeamMembers: LiteTheirTeamMember[];

	@nested(LiteTarget)
	liteTargets: LiteTarget[];

	@nested(LiteOurTeamMember)
	liteOurTeamMembers: LiteOurTeamMember[];



}
