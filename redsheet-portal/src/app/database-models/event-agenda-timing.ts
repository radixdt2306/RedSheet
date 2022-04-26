import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectEventTimeline, Tactic, vEventAgendaTimingRecord } from './'
export class EventAgendaTiming {
    constructor(eventAgendaTiming?: EventAgendaTiming | vEventAgendaTimingRecord) {
        let properties = ["eventAgendaTimingId", "payOff", "process", "purpose", "sortOrder", "time", "topic", "trigger", "negotiationPhaseId", "projectEventTimelineId", "tacticsId", "previousEventAgendaTimingId", "previousEventAgendaTimingSortOrder", "previousEventAgendaTimingTime",];
        for (let property of properties)
            if (eventAgendaTiming && eventAgendaTiming[property])
                this[property] = eventAgendaTiming[property];
    }

    eventAgendaTimingId: number = 0;

    @required()
    @maxLength(200)
    payOff: string = undefined;

    @required()
    @maxLength(200)
    process: string = undefined;

    @required()
    @maxLength(200)
    purpose: string = undefined;

    @range(1, 2147483647)
    sortOrder: number = undefined;

    @required()
    time: Date = undefined;

    @required()
    @maxLength(200)
    topic: string = undefined;

    @required()
    @maxLength(200)
    trigger: string = undefined;

    @range(0, 2147483647)
    negotiationPhaseId: number = undefined;

    @range(0, 2147483647)
    projectEventTimelineId: number = undefined;
    projectEventTimeline: ProjectEventTimeline;

    @range(0, 2147483647)
    tacticsId: number = undefined;
    tactic: Tactic;

    previousEventAgendaTimingId: number = undefined;
    previousEventAgendaTimingSortOrder: number = undefined;
    previousEventAgendaTimingTime: string = undefined;

}
