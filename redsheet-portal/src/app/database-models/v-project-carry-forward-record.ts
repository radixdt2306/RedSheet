import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectCarryForwardRecord {
    constructor(vProjectCarryForwardRecord?: vProjectCarryForwardRecord )  {
        let properties = [ "carryForwardValue", "projectCarryForwardId", "projectModuleId",];
        for (let property of properties)
            if (vProjectCarryForwardRecord && vProjectCarryForwardRecord[property])
                this[property] = vProjectCarryForwardRecord[property];
    }
 
    @required()
    @maxLength(1000)
	carryForwardValue : string =   undefined;
 
	projectCarryForwardId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;


}
