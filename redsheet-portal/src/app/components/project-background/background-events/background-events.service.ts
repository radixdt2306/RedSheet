import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  BackgroundEvent, vBackgroundEvent, vBackgroundEventRecord, } from 'app/database-models';
import { BackgroundEventLookupGroup } from './domain/background-event.models';

@Injectable()
export class BackgroundEventsService {
	private projectBackgroundId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectBackgrounds/${this.projectBackgroundId}/BackgroundEvents`,
            childModuleName: 'background-events',
            keyName:'backgroundEventId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<BackgroundEventLookupGroup>(lookupActions: LookupAction[]): Promise<BackgroundEventLookupGroup> {
        return this.http.lookup<BackgroundEventLookupGroup>(lookupActions);
    }

    group<BackgroundEventLookupGroup>(projectBackgroundId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<BackgroundEventLookupGroup> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.group<BackgroundEventLookupGroup>(this.api, params, 'vBackgroundEventRecord', lookupActions);
    }

	search(projectBackgroundId: number,search: any): Observable<vBackgroundEvent[]> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.search<vBackgroundEvent[]>(this.api, search);
    }

    get(projectBackgroundId : number): Observable<vBackgroundEvent[]> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.get<vBackgroundEvent[]>(this.api);
    }

    getBy(projectBackgroundId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vBackgroundEventRecord> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.get<vBackgroundEventRecord>(this.api, params);
    }

    post(projectBackgroundId : number,backgroundEvent: BackgroundEvent): Observable<BackgroundEvent> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.post<BackgroundEvent>(this.api, backgroundEvent);
    } 

    put(projectBackgroundId : number,backgroundEvent: BackgroundEvent): Observable<BackgroundEvent> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.put<BackgroundEvent>(this.api, backgroundEvent);
    }

    delete(projectBackgroundId : number,id : number): Observable<BackgroundEvent> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.delete<BackgroundEvent>(this.api,id);
    }

}
