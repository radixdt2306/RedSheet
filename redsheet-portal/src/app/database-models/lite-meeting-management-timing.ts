import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteMeetingManagement, Tactic,  vLiteMeetingManagementTimingRecord  } from './'
export class LiteMeetingManagementTiming {
    constructor(liteMeetingManagementTiming?: LiteMeetingManagementTiming  | vLiteMeetingManagementTimingRecord )  {
        let properties = [ "liteMeetingManagementTimingId", "process", "sortOrder", "time", "liteMeetingManagementId", "negotiationPhaseId", "tacticId", "previousLiteMeetingManagementTimingId", "previousLiteMeetingManagementTimingSortOrder", "previousLiteMeetingManagementTimingTime",];
        for (let property of properties)
            if (liteMeetingManagementTiming && liteMeetingManagementTiming[property])
                this[property] = liteMeetingManagementTiming[property];
    }

	liteMeetingManagementTimingId : number =   0 ;

    @required()
    @maxLength(400)
	process : string =   undefined;

    @range(1,2147483647)
	sortOrder : number =   undefined;

    @required()
	time : Date =   undefined;

    @range(0,2147483647)
	liteMeetingManagementId : number =   undefined;
	liteMeetingManagement : LiteMeetingManagement  ;

    @range(0,2147483647)
	negotiationPhaseId : number =   undefined;

    @range(0,2147483647)
	tacticId : number =   undefined;
	tactic : Tactic  ;

	previousLiteMeetingManagementTimingId : number =   undefined;
	previousLiteMeetingManagementTimingSortOrder : number =   undefined;
	previousLiteMeetingManagementTimingTime : string =   undefined;

}
