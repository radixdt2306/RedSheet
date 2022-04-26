import { required, maxLength, range, nested } from '@rx/annotations';

export class vModuleMaster {
    constructor(vModuleMaster?: vModuleMaster )  {
        let properties = [ "moduleMasterId", "moduleMasterName",];
        for (let property of properties)
            if (vModuleMaster && vModuleMaster[property])
                this[property] = vModuleMaster[property];
    }
 
	moduleMasterId : number =   0 ;
 
    @required()
    @maxLength(100)
	moduleMasterName : string =   undefined;


}
