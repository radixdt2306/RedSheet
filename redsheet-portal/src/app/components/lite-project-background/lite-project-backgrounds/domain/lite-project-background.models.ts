import { 
	CommunicationMode,
	ValueObjective,
	vLiteProjectBackgroundRecord,
	LiteProjectBackground,
	LiteTheirTeamMember,
	LiteOurTeamMember,
	LiteBackgroundCommunicationMode,
	ProjectModule,
	LiteRelationshipRequire
} from 'app/database-models';
import { range, required, maxLength, nested } from '@rx/annotations';

export class LiteProjectBackgroundLookupGroup {
	communicationModes : CommunicationMode[];
	valueObjectives : ValueObjective[];
	liteRelationshipRequires : LiteRelationshipRequire[];
	vLiteProjectBackgroundRecord : vLiteProjectBackgroundRecord;
	liteProjectBackground : LiteProjectBackground;
}
export class LiteBackgroundCommunicationModeViewModels{
	constructor(liteProjectBackground?: LiteProjectBackground  | vLiteProjectBackgroundRecord )  {
        let properties = [ "isActive","removeIndex","dateOfNegotiation", "focus", "isRelationshipRequired", "knowAboutThem", "knownIssues", "liteProjectBackgroundId", "opponentName", "reason", "valueObjectiveId", "projectModuleId", "liteBackgroundCommunicationModes", "liteTheirTeamMembers", "liteOurTeamMembers",];
        for (let property of properties)
            if (liteProjectBackground && liteProjectBackground[property])
                this[property] = liteProjectBackground[property];
    }
 
    @required()
	dateOfNegotiation : Date =   undefined;
 
    @required()
    @maxLength(1000)
	focus : string =   undefined;
 
	isRelationshipRequired : boolean = false ;
 
    @required()
    @maxLength(1000)
	knowAboutThem : string =   undefined;
 
    @required()
    @maxLength(1000)
	knownIssues : string =   undefined;
 
	liteProjectBackgroundId : number =   0 ;
 
    @required()
    @maxLength(1000)
	opponentName : string =   undefined;
 
    @required()
    @maxLength(1000)
	reason : string =   undefined;
 
    @range(1,2147483647)
	valueObjectiveId : number =   undefined;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;

	isActive : boolean =   false;
	removeIndex:number;

	@nested(LiteBackgroundCommunicationMode)
	liteBackgroundCommunicationModes: LiteBackgroundCommunicationMode[];

	@nested(LiteTheirTeamMember)
	liteTheirTeamMembers: LiteTheirTeamMember[];

	@nested(LiteOurTeamMember)
	liteOurTeamMembers: LiteOurTeamMember[];

}