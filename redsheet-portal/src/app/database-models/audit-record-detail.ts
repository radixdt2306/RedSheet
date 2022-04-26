import { required, maxLength, range, nested } from '@rx/annotations';
import { AuditRecord,  } from './'
export class AuditRecordDetail {
    constructor(auditRecordDetail?: AuditRecordDetail )  {
        let properties = [ "auditRecordDetailId", "columnName", "newValue", "oldValue", "referenceTableName", "auditRecordId",];
        for (let property of properties)
            if (auditRecordDetail && auditRecordDetail[property])
                this[property] = auditRecordDetail[property];
    }
 
	auditRecordDetailId : number =   0 ;
 
    @required()
    @maxLength(50)
	columnName : string =   undefined;
 
	newValue : string =   undefined;
 
	oldValue : string =   undefined;
 
    @required()
    @maxLength(50)
	referenceTableName : string =   undefined;
 
    @range(0,2147483647)
	auditRecordId : number =   undefined;
	auditRecord : AuditRecord  ;


}
