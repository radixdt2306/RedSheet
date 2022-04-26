import { required, maxLength, range, } from '@rx/annotations';
export class AuditLogSearchModel {
    @required()
    userId: number = 0;
    @required()
    applicationModuleId: number = 0;
    startDate: Date = undefined;
    endDate: Date = undefined;
    requestMethod: string = "";
    mainRecordId: number = undefined
}