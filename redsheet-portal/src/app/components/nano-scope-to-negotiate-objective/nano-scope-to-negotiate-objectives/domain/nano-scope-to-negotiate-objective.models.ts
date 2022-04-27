import { 
	CommunicationMode,
	ValueObjective,
	NanoRelationshipRequire,
	NanoScopeToNegotiate,
	vNanoScopeToNegotiateObjectiveRecord,
	NanoScopeToNegotiateObjective,
} from 'app/database-models';

export class NanoScopeToNegotiateObjectiveLookupGroup {
	communicationModes : CommunicationMode[];
	valueObjectives : ValueObjective[];
	nanoRelationshipRequires : NanoRelationshipRequire[];
	nanoScopeToNegotiates : NanoScopeToNegotiate[];
	vNanoScopeToNegotiateObjectiveRecord : vNanoScopeToNegotiateObjectiveRecord;
	nanoScopeToNegotiateObjective : NanoScopeToNegotiateObjective;
}
