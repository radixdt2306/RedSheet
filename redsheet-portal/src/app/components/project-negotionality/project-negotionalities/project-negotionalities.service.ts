import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectNegotionality, vProjectNegotionalityRecord, } from 'app/database-models';
import { ProjectNegotionalityLookupGroup } from './domain/project-negotionality.models';

@Injectable()
export class ProjectNegotionalitiesService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectNegotionalities`,
            applicationModuleId: 5088,
            keyName:'projectNegotionalityId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectNegotionalityLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectNegotionalityLookupGroup> {
        return this.http.lookup<ProjectNegotionalityLookupGroup>(lookupActions);
    }

    group<ProjectNegotionalityLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectNegotionalityLookupGroup> {
        return this.http.group<ProjectNegotionalityLookupGroup>(this.api, params, 'vProjectNegotionalityRecord', lookupActions);
    }

	search(search: any): Observable<ProjectNegotionality[]> {
        return this.http.search<ProjectNegotionality[]>(this.api, search);
    }

    get(): Observable<ProjectNegotionality[]> {
        return this.http.get<ProjectNegotionality[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectNegotionalityRecord> {
        return this.http.get<vProjectNegotionalityRecord>(this.api, params); 
    }

    post(projectNegotionality: ProjectNegotionality): Observable<ProjectNegotionality> {
        return this.http.post<ProjectNegotionality>(this.api, projectNegotionality);
    }

    put(projectNegotionality: ProjectNegotionality): Observable<ProjectNegotionality> {
        return this.http.put<ProjectNegotionality>(this.api, projectNegotionality);
    }

    delete(id : number): Observable<ProjectNegotionality> {
        return this.http.delete<ProjectNegotionality>(this.api,id);
    }

}
