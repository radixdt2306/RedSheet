import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteMeetingManagementRecord {
    constructor(vLiteMeetingManagementRecord?: vLiteMeetingManagementRecord )  {
        let properties = [ "intangiblePowerPlan", "liteMeetingManagementId", "openingStatement", "preMeetingConditioning", "projectModuleId",];
        for (let property of properties)
            if (vLiteMeetingManagementRecord && vLiteMeetingManagementRecord[property])
                this[property] = vLiteMeetingManagementRecord[property];
    }
 
    @required()
    @maxLength(400)
	intangiblePowerPlan : string =   undefined;
 
	liteMeetingManagementId : number =   0 ;
 
    @required()
    @maxLength(200)
	openingStatement : string =   undefined;
 
    @required()
    @maxLength(160)
	preMeetingConditioning : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;


}
