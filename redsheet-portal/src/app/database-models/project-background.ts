import { required, maxLength, range, nested } from '@rx/annotations';
import { NegotiationType, ProjectModule, RelationshipRequire, ValueObjective, LongTermObjective, BackgroundEvent, } from './'
export class ProjectBackground {
    constructor(projectBackground?: ProjectBackground) {
        let properties = ["focus", "opponentName", "projectBackgroundId", "reason", "negotiationTypeId", "projectModuleId", "relationshipRequireId", "valueObjectiveId", "longTermObjectives", "backgroundEvents",];
        for (let property of properties)
            if (projectBackground && projectBackground[property])
                this[property] = projectBackground[property];
    }

    @required()
    @maxLength(200)
    focus: string = undefined;

    @required()
    @maxLength(100)
    opponentName: string = undefined;

    projectBackgroundId: number = 0;

    @required()
    @maxLength(200)
    reason: string = undefined;

    @range(0, 2147483647)
    negotiationTypeId: number = undefined;
    negotiationType: NegotiationType;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;

    @range(0, 2147483647)
    relationshipRequireId: number = undefined;
    relationshipRequire: RelationshipRequire;

    @range(0, 2147483647)
    valueObjectiveId: number = undefined;
    valueObjective: ValueObjective;
    @nested(LongTermObjective)
    longTermObjectives: LongTermObjective[];

    @nested(BackgroundEvent)
    backgroundEvents: BackgroundEvent[];



}
