import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  LongTermObjective, vLongTermObjective, vLongTermObjectiveRecord, } from 'app/database-models';
import { LongTermObjectiveLookupGroup } from './domain/long-term-objective.models';

@Injectable()
export class LongTermObjectivesService {
	private projectBackgroundId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectBackgrounds/${this.projectBackgroundId}/LongTermObjectives`,
            childModuleName: 'long-term-objectives',
            keyName:'longTermObjectiveId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<LongTermObjectiveLookupGroup>(lookupActions: LookupAction[]): Promise<LongTermObjectiveLookupGroup> {
        return this.http.lookup<LongTermObjectiveLookupGroup>(lookupActions);
    }

    group<LongTermObjectiveLookupGroup>(projectBackgroundId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<LongTermObjectiveLookupGroup> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.group<LongTermObjectiveLookupGroup>(this.api, params, 'vLongTermObjectiveRecord', lookupActions);
    }

	search(projectBackgroundId: number,search: any): Observable<vLongTermObjective[]> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.search<vLongTermObjective[]>(this.api, search);
    }

    get(projectBackgroundId : number): Observable<vLongTermObjective[]> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.get<vLongTermObjective[]>(this.api);
    }

    getBy(projectBackgroundId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vLongTermObjectiveRecord> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.get<vLongTermObjectiveRecord>(this.api, params);
    }

    post(projectBackgroundId : number,longTermObjective: LongTermObjective): Observable<LongTermObjective> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.post<LongTermObjective>(this.api, longTermObjective);
    } 

    put(projectBackgroundId : number,longTermObjective: LongTermObjective): Observable<LongTermObjective> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.put<LongTermObjective>(this.api, longTermObjective);
    }

    delete(projectBackgroundId : number,id : number): Observable<LongTermObjective> {
		this.projectBackgroundId = projectBackgroundId;
        return this.http.delete<LongTermObjective>(this.api,id);
    }

}
