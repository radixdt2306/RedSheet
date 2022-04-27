import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  NanoScopeToNegotiateObjective, vNanoScopeToNegotiateObjectiveRecord, } from 'app/database-models';
import { NanoScopeToNegotiateObjectiveLookupGroup } from './domain/nano-scope-to-negotiate-objective.models';

@Injectable()
export class NanoScopeToNegotiateObjectivesService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/NanoScopeToNegotiateObjectives`,
            applicationModuleId: 6143,
            keyName:'nanoScopeToNegotiateObjectiveId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<NanoScopeToNegotiateObjectiveLookupGroup>(lookupActions: LookupAction[]): Promise<NanoScopeToNegotiateObjectiveLookupGroup> {
        return this.http.lookup<NanoScopeToNegotiateObjectiveLookupGroup>(lookupActions);
    }

    group<NanoScopeToNegotiateObjectiveLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<NanoScopeToNegotiateObjectiveLookupGroup> {
        return this.http.group<NanoScopeToNegotiateObjectiveLookupGroup>(this.api, params, 'vNanoScopeToNegotiateObjectiveRecord', lookupActions);
    }

	search(search: any): Observable<NanoScopeToNegotiateObjective[]> {
        return this.http.search<NanoScopeToNegotiateObjective[]>(this.api, search);
    }

    get(): Observable<NanoScopeToNegotiateObjective[]> {
        return this.http.get<NanoScopeToNegotiateObjective[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vNanoScopeToNegotiateObjectiveRecord> {
        return this.http.get<vNanoScopeToNegotiateObjectiveRecord>(this.api, params); 
    }

    post(nanoScopeToNegotiateObjective: NanoScopeToNegotiateObjective): Observable<NanoScopeToNegotiateObjective> {
        return this.http.post<NanoScopeToNegotiateObjective>(this.api, nanoScopeToNegotiateObjective);
    }

    put(nanoScopeToNegotiateObjective: NanoScopeToNegotiateObjective): Observable<NanoScopeToNegotiateObjective> {
        return this.http.put<NanoScopeToNegotiateObjective>(this.api, nanoScopeToNegotiateObjective);
    }

    delete(id : number): Observable<NanoScopeToNegotiateObjective> {
        return this.http.delete<NanoScopeToNegotiateObjective>(this.api,id);
    }

}
