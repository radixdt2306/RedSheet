import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ArrivalAndOpeningTactic, vArrivalAndOpeningTactic, } from 'app/database-models';
import { ArrivalAndOpeningTacticLookupGroup } from './domain/arrival-and-opening-tactic.models';

@Injectable()
export class ArrivalAndOpeningTacticsService {
	private projectEventTimelineId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectEventTimelines/${this.projectEventTimelineId}/ArrivalAndOpeningTactics`,
            childModuleName: 'arrival-and-opening-tactics',
            keyName:'arrivalAndOpeningTacticId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<ArrivalAndOpeningTacticLookupGroup>(lookupActions: LookupAction[]): Promise<ArrivalAndOpeningTacticLookupGroup> {
        return this.http.lookup<ArrivalAndOpeningTacticLookupGroup>(lookupActions);
    }

    group<ArrivalAndOpeningTacticLookupGroup>(projectEventTimelineId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ArrivalAndOpeningTacticLookupGroup> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.group<ArrivalAndOpeningTacticLookupGroup>(this.api, params, 'ArrivalAndOpeningTactic', lookupActions);
    }

	search(projectEventTimelineId: number,search: any): Observable<vArrivalAndOpeningTactic[]> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.search<vArrivalAndOpeningTactic[]>(this.api, search);
    }

    get(projectEventTimelineId : number): Observable<vArrivalAndOpeningTactic[]> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.get<vArrivalAndOpeningTactic[]>(this.api);
    }

    getBy(projectEventTimelineId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<ArrivalAndOpeningTactic> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.get<ArrivalAndOpeningTactic>(this.api, params);
    }

    post(projectEventTimelineId : number,arrivalAndOpeningTactic: ArrivalAndOpeningTactic): Observable<ArrivalAndOpeningTactic> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.post<ArrivalAndOpeningTactic>(this.api, arrivalAndOpeningTactic);
    } 

    put(projectEventTimelineId : number,arrivalAndOpeningTactic: ArrivalAndOpeningTactic): Observable<ArrivalAndOpeningTactic> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.put<ArrivalAndOpeningTactic>(this.api, arrivalAndOpeningTactic);
    }

    delete(projectEventTimelineId : number,id : number): Observable<ArrivalAndOpeningTactic> {
		this.projectEventTimelineId = projectEventTimelineId;
        return this.http.delete<ArrivalAndOpeningTactic>(this.api,id);
    }

}
