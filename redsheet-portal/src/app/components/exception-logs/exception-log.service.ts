import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { ExceptionLogViewModel, ExceptionLogLookupGroup } from './domain/exception-log.models';
import { vApplicationExceptionLog } from "app/database-models";
import { LogSearchModel } from "app/models"
import { AuthorizeApi } from "@rx/security";

@Injectable()
export class ExceptionLogService {
    //private api: string = 'api/exceptionlogs'
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/exceptionlogs`,
            applicationModuleId: 27,
            keyName: 'applicationExceptionLogId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }
    lookup<ExceptionLogLookupGroup>(lookupActions: LookupAction[]): Promise<ExceptionLogLookupGroup> {
        return this.http.lookup<ExceptionLogLookupGroup>(lookupActions);
    }
    search(logSearch: LogSearchModel): Observable<ExceptionLogViewModel[]>
    {
        return this.http.post<ExceptionLogViewModel[]>(this.api, logSearch,false);
    }
    getBy(params?: any[] | { [key: string]: any; } | RequestQueryParams): Observable<vApplicationExceptionLog> {
         return this.http.get<vApplicationExceptionLog>(this.api, params);
    }
}
