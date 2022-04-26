import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteMeetingManagementTiming {
    constructor(vLiteMeetingManagementTiming?: vLiteMeetingManagementTiming )  {
        let properties = [ "liteMeetingManagementId", "liteMeetingManagementTimingId", "negotiationPhase", "negotiationPhaseId", "process", "sortOrder", "tacticId", "tacticName", "time",];
        for (let property of properties)
            if (vLiteMeetingManagementTiming && vLiteMeetingManagementTiming[property])
                this[property] = vLiteMeetingManagementTiming[property];
    }
 
	liteMeetingManagementId : number =   0 ;
 
    @range(1,2147483647)
	liteMeetingManagementTimingId : number =   undefined;
 
    @required()
    @maxLength(100)
	negotiationPhase : string =   undefined;
 
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
    @maxLength(200)
	tacticName : string =   undefined;
 
    @required()
	time : Date =   undefined;


}
