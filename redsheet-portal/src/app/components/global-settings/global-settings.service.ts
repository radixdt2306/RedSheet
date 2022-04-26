import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { GlobalSetting } from "app/database-models";
import { AuthorizeApi } from "@rx/security";

@Injectable()
export class GlobalSettingsService {
    constructor(
        private http: RxHttp
    ) { }
    //private api: string = 'api/GlobalSettings'
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/globalSettings`,
            applicationModuleId: 21,
            keyName: 'configurationId'
        }
        return authorizeApi;
    }
    get(): Observable<GlobalSetting> {
        return this.http.get<GlobalSetting>(this.api);
    }
    put(globalSettings: GlobalSetting): Observable<GlobalSetting> {
        return this.http.put<GlobalSetting>(this.api, globalSettings);
    }
    post(globalSettings: GlobalSetting): Observable<GlobalSetting> {
        return this.http.post<GlobalSetting>(this.api, globalSettings);
    }
     lookup<globalSettingsLookupGroup>(lookupActions: LookupAction[]): Promise<globalSettingsLookupGroup> {
        return this.http.lookup<globalSettingsLookupGroup>(lookupActions);
    }   
    
}
