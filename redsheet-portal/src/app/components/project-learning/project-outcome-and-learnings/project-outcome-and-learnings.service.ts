import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectOutcomeAndLearning, vProjectOutcomeAndLearning, vProjectOutcomeAndLearningRecord, } from 'app/database-models';
import { ProjectOutcomeAndLearningLookupGroup } from './domain/project-outcome-and-learning.models';

@Injectable()
export class ProjectOutcomeAndLearningsService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectOutcomeAndLearnings`,
            applicationModuleId: 5098,
            keyName:'projectOutcomeAndLearningId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectOutcomeAndLearningLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectOutcomeAndLearningLookupGroup> {
        return this.http.lookup<ProjectOutcomeAndLearningLookupGroup>(lookupActions);
    }

    group<ProjectOutcomeAndLearningLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectOutcomeAndLearningLookupGroup> {
        return this.http.group<ProjectOutcomeAndLearningLookupGroup>(this.api, params, 'vProjectOutcomeAndLearningRecord', lookupActions);
    }

	search(search: any): Observable<vProjectOutcomeAndLearning[]> {
        return this.http.search<vProjectOutcomeAndLearning[]>(this.api, search);
    }

    get(): Observable<vProjectOutcomeAndLearning[]> {
        return this.http.get<vProjectOutcomeAndLearning[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectOutcomeAndLearningRecord> {
        return this.http.get<vProjectOutcomeAndLearningRecord>(this.api, params); 
    }

    post(projectOutcomeAndLearning: ProjectOutcomeAndLearning): Observable<ProjectOutcomeAndLearning> {
        return this.http.post<ProjectOutcomeAndLearning>(this.api, projectOutcomeAndLearning);
    }

    put(projectOutcomeAndLearning: ProjectOutcomeAndLearning): Observable<ProjectOutcomeAndLearning> {
        return this.http.put<ProjectOutcomeAndLearning>(this.api, projectOutcomeAndLearning);
    }

    delete(id : number): Observable<ProjectOutcomeAndLearning> {
        return this.http.delete<ProjectOutcomeAndLearning>(this.api,id);
    }

}
