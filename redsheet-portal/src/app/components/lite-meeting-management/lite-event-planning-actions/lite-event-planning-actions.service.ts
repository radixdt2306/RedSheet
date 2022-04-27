import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  LiteEventPlanningAction, vLiteEventPlanningAction, vLiteEventPlanningActionRecord,vUserLookup, } from 'app/database-models';
import { LiteEventPlanningActionLookupGroup } from './domain/lite-event-planning-action.models';

@Injectable()
export class LiteEventPlanningActionsService {
	private liteMeetingManagementId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/LiteMeetingManagements/${this.liteMeetingManagementId}/LiteEventPlanningActions`,
            childModuleName: 'lite-event-planning-actions',
            keyName:'liteEventPlanningActionId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<LiteEventPlanningActionLookupGroup>(lookupActions: LookupAction[]): Promise<LiteEventPlanningActionLookupGroup> {
        return this.http.lookup<LiteEventPlanningActionLookupGroup>(lookupActions);
    }

    group<LiteEventPlanningActionLookupGroup>(liteMeetingManagementId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<LiteEventPlanningActionLookupGroup> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.group<LiteEventPlanningActionLookupGroup>(this.api, params, 'vLiteEventPlanningActionRecord', lookupActions);
    }

	// search(liteMeetingManagementId: number,search: any): Observable<vLiteEventPlanningAction[]> {
	// 	this.liteMeetingManagementId = liteMeetingManagementId;
    //     return this.http.search<vLiteEventPlanningAction[]>(this.api, search);
    // }
    search(search: any): Observable<any> {
        return this.http.search<vUserLookup>(this.api, search,false);
    }
    get(liteMeetingManagementId : number): Observable<vLiteEventPlanningAction[]> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.get<vLiteEventPlanningAction[]>(this.api);
    }

    getBy(liteMeetingManagementId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vLiteEventPlanningActionRecord> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.get<vLiteEventPlanningActionRecord>(this.api, params);
    }

    post(liteMeetingManagementId : number,liteEventPlanningAction: LiteEventPlanningAction): Observable<LiteEventPlanningAction> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.post<LiteEventPlanningAction>(this.api, liteEventPlanningAction);
    } 

    put(liteMeetingManagementId : number,liteEventPlanningAction: LiteEventPlanningAction): Observable<LiteEventPlanningAction> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.put<LiteEventPlanningAction>(this.api, liteEventPlanningAction);
    }

    delete(liteMeetingManagementId : number,id : number): Observable<LiteEventPlanningAction> {
		this.liteMeetingManagementId = liteMeetingManagementId;
        return this.http.delete<LiteEventPlanningAction>(this.api,id);
    }

}
