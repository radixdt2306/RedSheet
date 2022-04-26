import { required, maxLength, range, nested } from '@rx/annotations';

export class vPowerTypeDetail {
    constructor(vPowerTypeDetail?: vPowerTypeDetail )  {
        let properties = [ "actualId", "isOurKnowledge", "isTheirKnowledge", "powerTypeDetailId", "powerTypeId", "powerTypeName", "projectedId", "projectPowerId", "rationale",];
        for (let property of properties)
            if (vPowerTypeDetail && vPowerTypeDetail[property])
                this[property] = vPowerTypeDetail[property];
    }
 
    @range(1,2147483647)
	actualId : number =   undefined;
 
	isOurKnowledge : boolean = false ;
 
	isTheirKnowledge : boolean = false ;
 
	powerTypeDetailId : number =   0 ;
 
    @range(1,2147483647)
	powerTypeId : number =   undefined;
 
    @required()
    @maxLength(200)
	powerTypeName : string =   undefined;
 
    @range(1,2147483647)
	projectedId : number =   undefined;
 
    @range(1,2147483647)
	projectPowerId : number =   undefined;
 
    @required()
    @maxLength(250)
	rationale : string =   undefined;


}
