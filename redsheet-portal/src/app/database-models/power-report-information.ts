import { required, maxLength, range, nested } from '@rx/annotations';
import { ApplicationObject,  } from './'
export class PowerReportInformation {
    constructor(powerReportInformation?: PowerReportInformation )  {
        let properties = [ "imageName", "ourPowerKnowledge", "powerReportInformationId", "theirPowerKnowledge", "actualPowerId", "projectedPowerId",];
        for (let property of properties)
            if (powerReportInformation && powerReportInformation[property])
                this[property] = powerReportInformation[property];
    }
 
    @maxLength(100)
	imageName : string =   undefined;
 
	ourPowerKnowledge : boolean = false ;
 
	powerReportInformationId : number =   0 ;
 
	theirPowerKnowledge : boolean = false ;
 
    @range(0,2147483647)
	actualPowerId : number =   undefined;
	applicationObject : ApplicationObject  ;
 
    @range(0,2147483647)
	projectedPowerId : number =   undefined;
	applicationObject1 : ApplicationObject  ;


}
