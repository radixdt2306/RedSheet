import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { ModuleMaster } from "app/database-models";
import { AuthorizeApi } from "@rx/security";


@Injectable()
export class ModulesService {
    //private api: string = 'api/moduleMasters'
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/moduleMasters`,
            applicationModuleId: 2,
            keyName: 'moduleMasterId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }
    get(): Observable<ModuleMaster[]> {
        return this.http.get<ModuleMaster[]>(this.api);
    }
    put(moduleMasters: ModuleMaster): Observable<ModuleMaster> {
        return this.http.put<ModuleMaster>(this.api, moduleMasters);
    }
    post(moduleMasters: ModuleMaster): Observable<ModuleMaster> {
        return this.http.post<ModuleMaster>(this.api, moduleMasters);
    }
    delete(moduleMasters: ModuleMaster): Observable<ModuleMaster> {
        return this.http.delete<ModuleMaster>(this.api, moduleMasters);
    }
}
