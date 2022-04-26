import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  Target, vTarget, vTargetRecord, } from 'app/database-models';
import { TargetLookupGroup } from './domain/target.models';

@Injectable()
export class TargetsService {
	private projectNegotiationId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectNegotiations/${this.projectNegotiationId}/Targets`,
            childModuleName: 'targets',
            keyName:'targetId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<TargetLookupGroup>(lookupActions: LookupAction[]): Promise<TargetLookupGroup> {
        return this.http.lookup<TargetLookupGroup>(lookupActions);
    }

    group<TargetLookupGroup>(projectNegotiationId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<TargetLookupGroup> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.group<TargetLookupGroup>(this.api, params, 'vTargetRecord', lookupActions);
    }

	search(projectNegotiationId: number,search: any): Observable<vTarget[]> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.search<vTarget[]>(this.api, search);
    }

    get(projectNegotiationId : number): Observable<vTarget[]> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.get<vTarget[]>(this.api);
    }

    getBy(projectNegotiationId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vTargetRecord> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.get<vTargetRecord>(this.api, params);
    }

    post(projectNegotiationId : number,target: Target): Observable<Target> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.post<Target>(this.api, target);
    } 

    put(projectNegotiationId : number,target: Target): Observable<Target> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.put<Target>(this.api, target);
    }

    delete(projectNegotiationId : number,id : number): Observable<Target> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.delete<Target>(this.api,id);
    }

}
