import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';

import { vLanguage } from 'app/database-models';
import { AuthorizeApi } from "@rx/security";

@Injectable()
export class LanguagesService {
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/languages`,
            applicationModuleId: 18,
            keyName: 'languageId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }
    get(): Observable<vLanguage[]> {
        return this.http.get<vLanguage[]>(this.api);
    }
    put(languages: vLanguage): Observable<vLanguage> {
        return this.http.put<vLanguage>(this.api, languages);
    }
}
