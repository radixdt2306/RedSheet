import { required, maxLength, range, nested } from '@rx/annotations';
import { AuditRecord,  } from './'
export class AuditRequest {
    constructor(auditRequest?: AuditRequest )  {
        let properties = [ "applicationModuleId", "applicationTimeZoneId", "auditRequestId", "createdDate", "mainRecordId", "requestMethod", "uri", "userId", "auditRecords",];
        for (let property of properties)
            if (auditRequest && auditRequest[property])
                this[property] = auditRequest[property];
    }
 
    @range(1,2147483647)
	applicationModuleId : number =   undefined;
 
    @range(1,2147483647)
	applicationTimeZoneId : number =   undefined;
 
	auditRequestId : number =   0 ;
 
    @required()
	createdDate : Date =   undefined;
 
    @range(1,2147483647)
	mainRecordId : number =   undefined;
 
    @required()
    @maxLength(20)
	requestMethod : string =   undefined;
 
    @required()
	uri : string =   undefined;
 
    @range(1,2147483647)
	userId : number =   undefined;
	@nested(AuditRecord)
	auditRecords: AuditRecord[];



}
