import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectCarryForward {
    constructor(vProjectCarryForward?: vProjectCarryForward )  {
        let properties = [ "carryForwardValue", "projectCarryForwardId", "projectModuleId",];
        for (let property of properties)
            if (vProjectCarryForward && vProjectCarryForward[property])
                this[property] = vProjectCarryForward[property];
    }
 
    @required()
    @maxLength(400)
	carryForwardValue : string =   undefined;
 
	projectCarryForwardId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;


}
