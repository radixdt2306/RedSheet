import { User, vApplicationTimeZone } from "app/database-models";
import { ApplicationModule } from "app/models/application-module.model";
export class AuditLogLookupGroup {
    users: User[];
    applicationModules: ApplicationModule[];
    requestMethods:string[];
    applicationTimeZone:vApplicationTimeZone[]
}

export class AuditLogViewModel {
    auditRequestId: number;
    requestMethod: string;
    date: string;
    userName: string;
    eventType: string;
}

export class AuditRecordDetails {
    columnName: string;
    oldValue: string;
    newValue: string;
}

