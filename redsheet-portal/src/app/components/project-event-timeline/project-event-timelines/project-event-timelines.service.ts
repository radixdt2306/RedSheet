import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectEventTimeline, vProjectEventTimelineRecord, } from 'app/database-models';
import { ProjectEventTimelineLookupGroup } from './domain/project-event-timeline.models';

@Injectable()
export class ProjectEventTimelinesService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectEventTimelines`,
            applicationModuleId: 5096,
            keyName:'projectEventTimelineId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectEventTimelineLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectEventTimelineLookupGroup> {
        return this.http.lookup<ProjectEventTimelineLookupGroup>(lookupActions);
    }

    group<ProjectEventTimelineLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectEventTimelineLookupGroup> {
        return this.http.group<ProjectEventTimelineLookupGroup>(this.api, params, 'vProjectEventTimelineRecord', lookupActions);
    }

	search(search: any): Observable<ProjectEventTimeline[]> {
        return this.http.search<ProjectEventTimeline[]>(this.api, search);
    }

    get(): Observable<ProjectEventTimeline[]> {
        return this.http.get<ProjectEventTimeline[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectEventTimelineRecord> {
        return this.http.get<vProjectEventTimelineRecord>(this.api, params); 
    }

    post(projectEventTimeline: ProjectEventTimeline): Observable<ProjectEventTimeline> {
        return this.http.post<ProjectEventTimeline>(this.api, projectEventTimeline);
    }

    put(projectEventTimeline: ProjectEventTimeline): Observable<ProjectEventTimeline> {
        return this.http.put<ProjectEventTimeline>(this.api, projectEventTimeline);
    }

    delete(id : number): Observable<ProjectEventTimeline> {
        return this.http.delete<ProjectEventTimeline>(this.api,id);
    }

}
