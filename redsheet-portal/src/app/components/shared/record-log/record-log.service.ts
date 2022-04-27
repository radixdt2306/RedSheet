//import { Injectable } from '@angular/core';
//import {Observable } from 'rxjs/Rx';

//import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
//import {  AuditRecord,AuditRecordDetail   }  from './record-log.models';
//@Injectable()
//export class RecordLogService {
//    private api: string = 'api/auditrecords'
//    constructor(
//        private http: RxHttp
//    ) { }
//    get(): Observable<AuditRecord[]> {
//        return this.http.get<AuditRecord[]>(this.api);
//    }
//    getBy(id: any): Observable<AuditRecordDetail[]> {
//        return this.http.get<AuditRecordDetail[]>(this.api.concat('/', id));
//    }
//}
