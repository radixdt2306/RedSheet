import { required, maxLength, range, nested } from '@rx/annotations';

export class vRecordStatus {
    constructor(vRecordStatus?: vRecordStatus )  {
        let properties = [ "recordStatusId", "recordStatusName",];
        for (let property of properties)
            if (vRecordStatus && vRecordStatus[property])
                this[property] = vRecordStatus[property];
    }
 
    @range(1,2147483647)
	recordStatusId : number =   undefined;
 
    @required()
    @maxLength(100)
	recordStatusName : string =   undefined;


}
