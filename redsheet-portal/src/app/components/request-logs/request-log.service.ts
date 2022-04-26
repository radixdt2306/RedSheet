import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { RequestLogViewModel, RequestLogLookupGroup } from './domain/request-log.models';
import { vRequestLog } from "app/database-models";
import { LogSearchModel } from "app/models"
import { AuthorizeApi } from "@rx/security";


@Injectable()
export class RequestLogService {
    //private api: string = 'api/requestlogs'
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/requestlogs`,
            applicationModuleId: 26,
            keyName: 'requestLogId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }
    lookup<RequestLogLookupGroup>(lookupActions: LookupAction[]): Promise<RequestLogLookupGroup> {
        return this.http.lookup<RequestLogLookupGroup>(lookupActions);
    }
    search(logSearch: LogSearchModel): Observable<RequestLogViewModel[]>
    {
        return this.http.post<RequestLogViewModel[]>(this.api, logSearch,false);
    }
    getBy(params?: any[] | { [key: string]: any; } | RequestQueryParams): Observable<vRequestLog> {
         return this.http.get<vRequestLog>(this.api, params);
    }
}
