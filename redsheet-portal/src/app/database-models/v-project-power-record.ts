import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectPowerRecord {
    constructor(vProjectPowerRecord?: vProjectPowerRecord )  {
        let properties = [ "powerDetail", "projectModuleId", "projectPowerId",];
        for (let property of properties)
            if (vProjectPowerRecord && vProjectPowerRecord[property])
                this[property] = vProjectPowerRecord[property];
    }
 
    @required()
    @maxLength(1000)
	powerDetail : string =   undefined;
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectPowerId : number =   undefined;


}
