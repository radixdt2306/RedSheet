import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteMeetingManagementTimingRecord {
    constructor(vLiteMeetingManagementTimingRecord?: vLiteMeetingManagementTimingRecord )  {
        let properties = [ "liteMeetingManagementId", "liteMeetingManagementTimingId", "negotiationPhaseId", "process", "sortOrder", "tacticId", "time",];
        for (let property of properties)
            if (vLiteMeetingManagementTimingRecord && vLiteMeetingManagementTimingRecord[property])
                this[property] = vLiteMeetingManagementTimingRecord[property];
    }
 
	liteMeetingManagementId : number =   0 ;
 
    @range(1,2147483647)
	liteMeetingManagementTimingId : number =   undefined;
 
    @range(1,2147483647)
	negotiationPhaseId : number =   undefined;
 
    @required()
    @maxLength(1000)
	process : string =   undefined;
 
    @range(1,2147483647)
	sortOrder : number =   undefined;
 
    @range(1,2147483647)
	tacticId : number =   undefined;
 
    @required()
	time : Date =   undefined;


}
