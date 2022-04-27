import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  EventPlanningAction, vEventPlanningAction, vEventPlanningActionRecord, vUserLookup, } from 'app/database-models';
import { EventPlanningActionLookupGroup } from './domain/event-planning-action.models';
import { User } from '@rx/security/security.models';

@Injectable()
export class EventPlanningActionsService {
	private projectPreparationId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectPreparations/${this.projectPreparationId}/EventPlanningActions`,
            childModuleName: 'event-planning-actions',
            keyName:'eventPlanningActionId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<EventPlanningActionLookupGroup>(lookupActions: LookupAction[]): Promise<EventPlanningActionLookupGroup> {
        return this.http.lookup<EventPlanningActionLookupGroup>(lookupActions);
    }

    group<EventPlanningActionLookupGroup>(projectPreparationId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<EventPlanningActionLookupGroup> {
		this.projectPreparationId = projectPreparationId;
        return this.http.group<EventPlanningActionLookupGroup>(this.api, params, 'vEventPlanningActionRecord', lookupActions);
    }

	// search(projectPreparationId: number,search: any): Observable<vEventPlanningAction[]> {
	// 	this.projectPreparationId = projectPreparationId;
    //     return this.http.search<vEventPlanningAction[]>(this.api, search);
    // }

    search(search: any): Observable<any> {
        return this.http.search<vUserLookup>(this.api, search,false);
    }


    get(projectPreparationId : number): Observable<vEventPlanningAction[]> {
		this.projectPreparationId = projectPreparationId;
        return this.http.get<vEventPlanningAction[]>(this.api);
    }

    getBy(projectPreparationId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vEventPlanningActionRecord> {
		this.projectPreparationId = projectPreparationId;
        return this.http.get<vEventPlanningActionRecord>(this.api, params);
    }

    post(projectPreparationId : number,eventPlanningAction: EventPlanningAction): Observable<EventPlanningAction> {
		this.projectPreparationId = projectPreparationId;
        return this.http.post<EventPlanningAction>(this.api, eventPlanningAction);
    } 

    put(projectPreparationId : number,eventPlanningAction: EventPlanningAction): Observable<EventPlanningAction> {
		this.projectPreparationId = projectPreparationId;
        return this.http.put<EventPlanningAction>(this.api, eventPlanningAction);
    }

    delete(projectPreparationId : number,id : number): Observable<EventPlanningAction> {
		this.projectPreparationId = projectPreparationId;
        return this.http.delete<EventPlanningAction>(this.api,id);
    }

}
