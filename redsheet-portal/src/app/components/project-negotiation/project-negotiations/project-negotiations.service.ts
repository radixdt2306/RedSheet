import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectNegotiation, vProjectNegotiationRecord, } from 'app/database-models';
import { ProjectNegotiationLookupGroup } from './domain/project-negotiation.models';

@Injectable()
export class ProjectNegotiationsService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectNegotiations`,
            applicationModuleId: 5089,
            keyName:'projectNegotiationId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectNegotiationLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectNegotiationLookupGroup> {
        return this.http.lookup<ProjectNegotiationLookupGroup>(lookupActions);
    }

    group<ProjectNegotiationLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectNegotiationLookupGroup> {
        return this.http.group<ProjectNegotiationLookupGroup>(this.api, params, 'vProjectNegotiationRecord', lookupActions);
    }

	search(search: any): Observable<ProjectNegotiation[]> {
        return this.http.search<ProjectNegotiation[]>(this.api, search);
    }

    get(): Observable<ProjectNegotiation[]> {
        return this.http.get<ProjectNegotiation[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectNegotiationRecord> {
        return this.http.get<vProjectNegotiationRecord>(this.api, params); 
    }

    post(projectNegotiation: ProjectNegotiation): Observable<ProjectNegotiation> {
        return this.http.post<ProjectNegotiation>(this.api, projectNegotiation);
    }

    put(projectNegotiation: ProjectNegotiation): Observable<ProjectNegotiation> {
        return this.http.put<ProjectNegotiation>(this.api, projectNegotiation);
    }

    delete(id : number): Observable<ProjectNegotiation> {
        return this.http.delete<ProjectNegotiation>(this.api,id);
    }

}
