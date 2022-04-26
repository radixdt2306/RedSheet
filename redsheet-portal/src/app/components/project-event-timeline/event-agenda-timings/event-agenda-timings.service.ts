import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  EventAgendaTiming, vEventAgendaTiming, vEventAgendaTimingRecord, } from 'app/database-models';
import { EventAgendaTimingLookupGroup } from './domain/event-agenda-timing.models';

@Injectable()
export class EventAgendaTimingsService {
	private projectEventTimelineId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectEventTimelines/${this.projectEventTimelineId}/EventAgendaTimings`,
            childModuleName: 'event-agenda-timings',
            keyName:'eventAgendaTimingId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<EventAgendaTimingLookupGroup>(lookupActions: LookupAction[]): Promise<EventAgendaTimingLookupGroup> {
        return this.http.lookup<EventAgendaTimingLookupGroup>(lookupActions);
    }

    group<EventAgendaTimingLookupGroup>(projectEventTimelineId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<EventAgendaTimingLookupGroup> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.group<EventAgendaTimingLookupGroup>(this.api, params, 'vEventAgendaTimingRecord', lookupActions);
    }

	search(projectEventTimelineId: number,search: any): Observable<vEventAgendaTiming[]> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.search<vEventAgendaTiming[]>(this.api, search);
    }

    get(projectEventTimelineId : number): Observable<vEventAgendaTiming[]> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.get<vEventAgendaTiming[]>(this.api);
    }

    getBy(projectEventTimelineId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vEventAgendaTimingRecord> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.get<vEventAgendaTimingRecord>(this.api, params);
    }

    post(projectEventTimelineId : number,eventAgendaTiming: EventAgendaTiming): Observable<EventAgendaTiming> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.post<EventAgendaTiming>(this.api, eventAgendaTiming);
    } 

    put(projectEventTimelineId : number,eventAgendaTiming: EventAgendaTiming): Observable<EventAgendaTiming> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.put<EventAgendaTiming>(this.api, eventAgendaTiming);
    }

    delete(projectEventTimelineId : number,id : number): Observable<EventAgendaTiming> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.delete<EventAgendaTiming>(this.api,id);
    }

}
