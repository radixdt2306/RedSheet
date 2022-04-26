import { required, maxLength, range, nested } from '@rx/annotations';
import { NanoRelationshipRequire, NanoScopeToNegotiate, ProjectModule, ValueObjective, NanoOurObjective, NanoScopeToNegotiateCommunicationMode, vNanoScopeToNegotiateObjectiveRecord } from './'
export class NanoScopeToNegotiateObjective {
    constructor(nanoScopeToNegotiateObjective?: NanoScopeToNegotiateObjective | vNanoScopeToNegotiateObjectiveRecord) {
        let properties = ["buy", "date", "focus", "knowAboutThem", "nanoScopeToNegotiateObjectiveId", "opponentName", "reason", "nanoRelationshipRequireId", "nanoScopeToNegotiateId", "projectModuleId", "valueObjectiveId", "nanoOurObjectives", "nanoScopeToNegotiateCommunicationModes",];
        for (let property of properties)
            if (nanoScopeToNegotiateObjective && nanoScopeToNegotiateObjective[property])
                this[property] = nanoScopeToNegotiateObjective[property];
    }

    @required()
    @maxLength(100)
    buy: string = undefined;

    @required()
    date: Date = undefined;

    @required()
    @maxLength(200)
    focus: string = undefined;

    @required()
    @maxLength(500)
    knowAboutThem: string = undefined;

    nanoScopeToNegotiateObjectiveId: number = 0;

    @required()
    @maxLength(100)
    opponentName: string = undefined;

    @required()
    @maxLength(200)
    reason: string = undefined;

    @range(0, 2147483647)
    nanoRelationshipRequireId: number = undefined;
    nanoRelationshipRequire: NanoRelationshipRequire;

    @range(0, 2147483647)
    nanoScopeToNegotiateId: number = undefined;
    nanoScopeToNegotiate: NanoScopeToNegotiate;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;

    @range(0, 2147483647)
    valueObjectiveId: number = undefined;
    valueObjective: ValueObjective;
    @nested(NanoOurObjective)
    nanoOurObjectives: NanoOurObjective[];

    @nested(NanoScopeToNegotiateCommunicationMode)
    nanoScopeToNegotiateCommunicationModes: NanoScopeToNegotiateCommunicationMode[];



}
