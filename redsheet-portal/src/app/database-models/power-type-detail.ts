import { required, maxLength, range, nested } from '@rx/annotations';
import { PowerType, ProjectPower,  vPowerTypeDetailRecord  } from './'
export class PowerTypeDetail {
    constructor(powerTypeDetail?: PowerTypeDetail  | vPowerTypeDetailRecord )  {
        let properties = [ "isOurKnowledge", "isTheirKnowledge", "powerTypeDetailId", "rationale", "actualId", "powerTypeId", "projectedId", "projectPowerId",];
        for (let property of properties)
            if (powerTypeDetail && powerTypeDetail[property])
                this[property] = powerTypeDetail[property];
    }
 
	isOurKnowledge : boolean = false ;
 
	isTheirKnowledge : boolean = false ;
 
	powerTypeDetailId : number =   0 ;
 
    @required()
    @maxLength(500)
	rationale : string =   undefined;
 
    @range(0,2147483647)
	actualId : number =   undefined;
 
    @range(0,2147483647)
	powerTypeId : number =   undefined;
	powerType : PowerType  ;
 
    @range(0,2147483647)
	projectedId : number =   undefined;
 
    @range(0,2147483647)
	projectPowerId : number =   undefined;
	projectPower : ProjectPower  ;


}
