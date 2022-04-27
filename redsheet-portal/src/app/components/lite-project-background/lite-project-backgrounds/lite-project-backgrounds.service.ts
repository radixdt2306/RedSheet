import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  LiteProjectBackground, vLiteProjectBackgroundRecord, } from 'app/database-models';
import { LiteProjectBackgroundLookupGroup } from './domain/lite-project-background.models';

@Injectable()
export class LiteProjectBackgroundsService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/LiteProjectBackgrounds`,
            applicationModuleId: 6137,
            keyName:'liteProjectBackgroundId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<LiteProjectBackgroundLookupGroup>(lookupActions: LookupAction[]): Promise<LiteProjectBackgroundLookupGroup> {
        return this.http.lookup<LiteProjectBackgroundLookupGroup>(lookupActions);
    }

    group<LiteProjectBackgroundLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<LiteProjectBackgroundLookupGroup> {
        return this.http.group<LiteProjectBackgroundLookupGroup>(this.api, params, 'vLiteProjectBackgroundRecord', lookupActions);
    }

	search(search: any): Observable<LiteProjectBackground[]> {
        return this.http.search<LiteProjectBackground[]>(this.api, search);
    }

    get(): Observable<LiteProjectBackground[]> {
        return this.http.get<LiteProjectBackground[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vLiteProjectBackgroundRecord> {
        return this.http.get<vLiteProjectBackgroundRecord>(this.api, params); 
    }

    post(liteProjectBackground: LiteProjectBackground): Observable<LiteProjectBackground> {
        return this.http.post<LiteProjectBackground>(this.api, liteProjectBackground);
    }

    put(liteProjectBackground: LiteProjectBackground): Observable<LiteProjectBackground> {
        return this.http.put<LiteProjectBackground>(this.api, liteProjectBackground);
    }

    delete(id : number): Observable<LiteProjectBackground> {
        return this.http.delete<LiteProjectBackground>(this.api,id);
    }

}
