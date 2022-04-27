import { required, maxLength, range, nested } from '@rx/annotations';

export class vLockRecord {
    constructor(vLockRecord?: vLockRecord )  {
        let properties = [ "applicationModuleId", "childModuleName", "expiresAt", "lockRecordId", "recordId",];
        for (let property of properties)
            if (vLockRecord && vLockRecord[property])
                this[property] = vLockRecord[property];
    }
 
	applicationModuleId : number =   0 ;
 
    @maxLength(100)
	childModuleName : string =   undefined;
 
    @required()
	expiresAt : Date =   undefined;
 
    @range(1,2147483647)
	lockRecordId : number =   undefined;
 
    @range(1,2147483647)
	recordId : number =   undefined;


}
