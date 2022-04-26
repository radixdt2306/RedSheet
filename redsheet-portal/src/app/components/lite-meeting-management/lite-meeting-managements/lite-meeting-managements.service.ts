import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  LiteMeetingManagement, vLiteMeetingManagementRecord, } from 'app/database-models';
import { LiteMeetingManagementLookupGroup } from './domain/lite-meeting-management.models';

@Injectable()
export class LiteMeetingManagementsService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/LiteMeetingManagements`,
            applicationModuleId: 6140,
            keyName:'liteMeetingManagementId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<LiteMeetingManagementLookupGroup>(lookupActions: LookupAction[]): Promise<LiteMeetingManagementLookupGroup> {
        return this.http.lookup<LiteMeetingManagementLookupGroup>(lookupActions);
    }

    group<LiteMeetingManagementLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<LiteMeetingManagementLookupGroup> {
        return this.http.group<LiteMeetingManagementLookupGroup>(this.api, params, 'vLiteMeetingManagementRecord', lookupActions);
    }

	search(search: any): Observable<LiteMeetingManagement[]> {
        return this.http.search<LiteMeetingManagement[]>(this.api, search);
    }

    get(): Observable<LiteMeetingManagement[]> {
        return this.http.get<LiteMeetingManagement[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vLiteMeetingManagementRecord> {
        return this.http.get<vLiteMeetingManagementRecord>(this.api, params); 
    }

    post(liteMeetingManagement: LiteMeetingManagement): Observable<LiteMeetingManagement> {
        return this.http.post<LiteMeetingManagement>(this.api, liteMeetingManagement);
    }

    put(liteMeetingManagement: LiteMeetingManagement): Observable<LiteMeetingManagement> {
        return this.http.put<LiteMeetingManagement>(this.api, liteMeetingManagement);
    }

    delete(id : number): Observable<LiteMeetingManagement> {
        return this.http.delete<LiteMeetingManagement>(this.api,id);
    }

}
