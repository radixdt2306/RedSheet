import { required, maxLength, range, nested } from '@rx/annotations';

export class vDbOperationType {
    constructor(vDbOperationType?: vDbOperationType )  {
        let properties = [ "dbOperationTypeId", "dbOperationTypeName",];
        for (let property of properties)
            if (vDbOperationType && vDbOperationType[property])
                this[property] = vDbOperationType[property];
    }
 
    @range(1,2147483647)
	dbOperationTypeId : number =   undefined;
 
    @required()
    @maxLength(100)
	dbOperationTypeName : string =   undefined;


}
