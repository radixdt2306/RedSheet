import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  LiteMeetingPlanning, vLiteMeetingPlanning, vLiteMeetingPlanningRecord, } from 'app/database-models';
import { LiteMeetingPlanningLookupGroup } from './domain/lite-meeting-planning.models';

@Injectable()
export class LiteMeetingPlanningsService {
	private liteMeetingManagementId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/LiteMeetingManagements/${this.liteMeetingManagementId}/LiteMeetingPlannings`,
            childModuleName: 'lite-meeting-plannings',
            keyName:'liteMeetingPlanningId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<LiteMeetingPlanningLookupGroup>(lookupActions: LookupAction[]): Promise<LiteMeetingPlanningLookupGroup> {
        return this.http.lookup<LiteMeetingPlanningLookupGroup>(lookupActions);
    }

    group<LiteMeetingPlanningLookupGroup>(liteMeetingManagementId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<LiteMeetingPlanningLookupGroup> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.group<LiteMeetingPlanningLookupGroup>(this.api, params, 'vLiteMeetingPlanningRecord', lookupActions);
    }

	search(liteMeetingManagementId: number,search: any): Observable<vLiteMeetingPlanning[]> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.search<vLiteMeetingPlanning[]>(this.api, search);
    }

    get(liteMeetingManagementId : number): Observable<vLiteMeetingPlanning[]> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.get<vLiteMeetingPlanning[]>(this.api);
    }

    getBy(liteMeetingManagementId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vLiteMeetingPlanningRecord> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.get<vLiteMeetingPlanningRecord>(this.api, params);
    }

    post(liteMeetingManagementId : number,liteMeetingPlanning: LiteMeetingPlanning): Observable<LiteMeetingPlanning> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.post<LiteMeetingPlanning>(this.api, liteMeetingPlanning);
    } 

    put(liteMeetingManagementId : number,liteMeetingPlanning: LiteMeetingPlanning): Observable<LiteMeetingPlanning> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.put<LiteMeetingPlanning>(this.api, liteMeetingPlanning);
    }

    delete(liteMeetingManagementId : number,id : number): Observable<LiteMeetingPlanning> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.delete<LiteMeetingPlanning>(this.api,id);
    }

}
