import { 
	vBackgroundEventRecord,
	BackgroundEvent,
} from 'app/database-models';

export class BackgroundEventLookupGroup {
	vBackgroundEventRecord : vBackgroundEventRecord;
	backgroundEvent : BackgroundEvent;
}
