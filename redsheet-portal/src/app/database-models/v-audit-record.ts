import { required, maxLength, range, nested } from '@rx/annotations';

export class vAuditRecord {
    constructor(vAuditRecord?: vAuditRecord )  {
        let properties = [ "auditRecordId", "auditRequestId", "eventType", "recordId", "recordName", "tableName",];
        for (let property of properties)
            if (vAuditRecord && vAuditRecord[property])
                this[property] = vAuditRecord[property];
    }
 
	auditRecordId : number =   0 ;
 
	auditRequestId : number =   undefined;
 
    @required()
    @maxLength(9)
	eventType : string =   undefined;
 
    @range(1,2147483647)
	recordId : number =   undefined;
 
    @required()
	recordName : string =   undefined;
 
    @required()
    @maxLength(50)
	tableName : string =   undefined;


}
