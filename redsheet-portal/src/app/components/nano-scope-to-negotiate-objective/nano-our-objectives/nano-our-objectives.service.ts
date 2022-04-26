import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  NanoOurObjective, vNanoOurObjective, vNanoOurObjectiveRecord, } from 'app/database-models';
import { NanoOurObjectiveLookupGroup } from './domain/nano-our-objective.models';

@Injectable()
export class NanoOurObjectivesService {
	private nanoScopeToNegotiateObjectiveId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/NanoScopeToNegotiateObjectives/${this.nanoScopeToNegotiateObjectiveId}/NanoOurObjectives`,
            childModuleName: 'nano-our-objectives',
            keyName:'nanoOurObjectiveId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<NanoOurObjectiveLookupGroup>(lookupActions: LookupAction[]): Promise<NanoOurObjectiveLookupGroup> {
        return this.http.lookup<NanoOurObjectiveLookupGroup>(lookupActions);
    }

    group<NanoOurObjectiveLookupGroup>(nanoScopeToNegotiateObjectiveId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<NanoOurObjectiveLookupGroup> {
		this.nanoScopeToNegotiateObjectiveId = nanoScopeToNegotiateObjectiveId;
        return this.http.group<NanoOurObjectiveLookupGroup>(this.api, params, 'vNanoOurObjectiveRecord', lookupActions);
    }

	search(nanoScopeToNegotiateObjectiveId: number,search: any): Observable<vNanoOurObjective[]> {
		this.nanoScopeToNegotiateObjectiveId = nanoScopeToNegotiateObjectiveId;
        return this.http.search<vNanoOurObjective[]>(this.api, search);
    }

    get(nanoScopeToNegotiateObjectiveId : number): Observable<vNanoOurObjective[]> {
		this.nanoScopeToNegotiateObjectiveId = nanoScopeToNegotiateObjectiveId;
        return this.http.get<vNanoOurObjective[]>(this.api);
    }

    getBy(nanoScopeToNegotiateObjectiveId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vNanoOurObjectiveRecord> {
		this.nanoScopeToNegotiateObjectiveId = nanoScopeToNegotiateObjectiveId;
        return this.http.get<vNanoOurObjectiveRecord>(this.api, params);
    }

    post(nanoScopeToNegotiateObjectiveId : number,nanoOurObjective: NanoOurObjective): Observable<NanoOurObjective> {
		this.nanoScopeToNegotiateObjectiveId = nanoScopeToNegotiateObjectiveId;
        return this.http.post<NanoOurObjective>(this.api, nanoOurObjective);
    } 

    put(nanoScopeToNegotiateObjectiveId : number,nanoOurObjective: NanoOurObjective): Observable<NanoOurObjective> {
		this.nanoScopeToNegotiateObjectiveId = nanoScopeToNegotiateObjectiveId;
        return this.http.put<NanoOurObjective>(this.api, nanoOurObjective);
    }

    delete(nanoScopeToNegotiateObjectiveId : number,id : number): Observable<NanoOurObjective> {
		this.nanoScopeToNegotiateObjectiveId = nanoScopeToNegotiateObjectiveId;
        return this.http.delete<NanoOurObjective>(this.api,id);
    }

}
