import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuditLogViewModel, AuditLogLookupGroup, AuditRecordDetails } from './domain/audit-log.models';
import { LogSearchModel } from "app/models/log-search.model"
import { AuthorizeApi } from "@rx/security";

@Injectable()
export class AuditLogService {
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/auditlog`,
            applicationModuleId: 28,
            keyName: 'auditRecordId'
        }
        return authorizeApi;
    }
    private get apiAuditLogDetail(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/auditlogdetail`,
            applicationModuleId: 28,
            keyName: 'auditRecordDetailId'
        }
        return authorizeApi;
    }
    //private api: string = 'api/auditlog'
    //private apiAuditLogDetail: string = 'api/auditlogdetail'
    constructor(
        private http: RxHttp
    ) { }
    lookup<AuditLogLookupGroup>(lookupActions: LookupAction[]): Promise<AuditLogLookupGroup> {
        return this.http.lookup<AuditLogLookupGroup>(lookupActions);
    }
    search(logSearch: LogSearchModel): Observable<AuditLogViewModel[]>
    {
        return this.http.post<AuditLogViewModel[]>(this.api, logSearch, false);
    }
    getBy(params?: any[] | { [key: string]: any; } | RequestQueryParams): Observable<AuditRecordDetails[]> {
         return this.http.get<AuditRecordDetails[]>(this.api, params);
    }
}
