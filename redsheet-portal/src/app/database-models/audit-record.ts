import { required, maxLength, range, nested } from '@rx/annotations';
import { AuditRequest, AuditRecordDetail,  } from './'
export class AuditRecord {
    constructor(auditRecord?: AuditRecord )  {
        let properties = [ "auditRecordId", "eventType", "newValue", "oldValue", "recordId", "recordName", "tableName", "auditRequestId", "auditRecordDetails",];
        for (let property of properties)
            if (auditRecord && auditRecord[property])
                this[property] = auditRecord[property];
    }
 
	auditRecordId : number =   0 ;
 
    @required()
    @maxLength(9)
	eventType : string =   undefined;
 
    @required()
	newValue : string =   undefined;
 
	oldValue : string =   undefined;
 
    @range(1,2147483647)
	recordId : number =   undefined;
 
    @required()
	recordName : string =   undefined;
 
    @required()
    @maxLength(50)
	tableName : string =   undefined;
 
	auditRequestId : number =   undefined;
	auditRequest : AuditRequest  ;
	@nested(AuditRecordDetail)
	auditRecordDetails: AuditRecordDetail[];



}
