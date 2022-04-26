import { 
	vEventPlanningActionRecord,
	EventPlanningAction,
} from 'app/database-models';

export class EventPlanningActionLookupGroup {
	vEventPlanningActionRecord : vEventPlanningActionRecord;
	eventPlanningAction : EventPlanningAction;
}
