import { 
	NegotiationType,
	ValueObjective,
	ProjectBackground,
    RelationshipRequire,
} from 'app/database-models';

export class ProjectBackgroundLookupGroup {
	negotiationTypes : NegotiationType[];
	valueObjectives : ValueObjective[];
	ProjectBackground : ProjectBackground;
	relationshipRequires: RelationshipRequire[];
}
