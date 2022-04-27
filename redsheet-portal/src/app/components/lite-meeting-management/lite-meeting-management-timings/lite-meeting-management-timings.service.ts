import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  LiteMeetingManagementTiming, vLiteMeetingManagementTiming, vLiteMeetingManagementTimingRecord, } from 'app/database-models';
import { LiteMeetingManagementTimingLookupGroup } from './domain/lite-meeting-management-timing.models';

@Injectable()
export class LiteMeetingManagementTimingsService {
	private liteMeetingManagementId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/LiteMeetingManagements/${this.liteMeetingManagementId}/LiteMeetingManagementTimings`,
            childModuleName: 'lite-meeting-management-timings',
            keyName:'liteMeetingManagementTimingId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<LiteMeetingManagementTimingLookupGroup>(lookupActions: LookupAction[]): Promise<LiteMeetingManagementTimingLookupGroup> {
        return this.http.lookup<LiteMeetingManagementTimingLookupGroup>(lookupActions);
    }

    group<LiteMeetingManagementTimingLookupGroup>(liteMeetingManagementId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<LiteMeetingManagementTimingLookupGroup> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.group<LiteMeetingManagementTimingLookupGroup>(this.api, params, 'vLiteMeetingManagementTimingRecord', lookupActions);
    }

	search(liteMeetingManagementId: number,search: any): Observable<vLiteMeetingManagementTiming[]> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.search<vLiteMeetingManagementTiming[]>(this.api, search);
    }

    get(liteMeetingManagementId : number): Observable<vLiteMeetingManagementTiming[]> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.get<vLiteMeetingManagementTiming[]>(this.api);
    }

    getBy(liteMeetingManagementId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vLiteMeetingManagementTimingRecord> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.get<vLiteMeetingManagementTimingRecord>(this.api, params);
    }

    post(liteMeetingManagementId : number,liteMeetingManagementTiming: LiteMeetingManagementTiming): Observable<LiteMeetingManagementTiming> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.post<LiteMeetingManagementTiming>(this.api, liteMeetingManagementTiming);
    } 

    put(liteMeetingManagementId : number,liteMeetingManagementTiming: LiteMeetingManagementTiming): Observable<LiteMeetingManagementTiming> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.put<LiteMeetingManagementTiming>(this.api, liteMeetingManagementTiming);
    }

    delete(liteMeetingManagementId : number,id : number): Observable<LiteMeetingManagementTiming> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.delete<LiteMeetingManagementTiming>(this.api,id);
    }

}
