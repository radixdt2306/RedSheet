import { 
	Tactic,
	vLiteMeetingManagementTimingRecord,
	LiteMeetingManagementTiming,
} from 'app/database-models';

export class LiteMeetingManagementTimingLookupGroup {
	tactics : Tactic[];
	vLiteMeetingManagementTimingRecord : vLiteMeetingManagementTimingRecord;
	liteMeetingManagementTiming : LiteMeetingManagementTiming;
}
