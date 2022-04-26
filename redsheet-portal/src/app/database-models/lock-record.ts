import { required, maxLength, range, nested } from '@rx/annotations';

export class LockRecord {
    constructor(lockRecord?: LockRecord )  {
        let properties = [ "applicationModuleId", "childModuleName", "expiresAt", "lockRecordId", "recordId", "userName",];
        for (let property of properties)
            if (lockRecord && lockRecord[property])
                this[property] = lockRecord[property];
    }
 
    @range(1,2147483647)
	applicationModuleId : number =   undefined;
 
    @maxLength(100)
	childModuleName : string =   undefined;
 
    @required()
	expiresAt : Date =   undefined;
 
	lockRecordId : number =   0 ;
 
    @range(1,2147483647)
	recordId : number =   undefined;
 
    @required()
    @maxLength(100)
	userName : string =   undefined;


}
