import { 
	vProjectEventTimelineRecord,
	ProjectEventTimeline,
} from 'app/database-models';

export class ProjectEventTimelineLookupGroup {
	vProjectEventTimelineRecord : vProjectEventTimelineRecord;
	projectEventTimeline : ProjectEventTimeline;
}
