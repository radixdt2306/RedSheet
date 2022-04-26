import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectCulturePlan, vProjectCulturePlanRecord, } from 'app/database-models';
import { ProjectCulturePlanLookupGroup } from './domain/project-culture-plan.models';

@Injectable()
export class ProjectCulturePlansService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectCulturePlans`,
            applicationModuleId: 5094,
            keyName:'projectCulturePlanId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectCulturePlanLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectCulturePlanLookupGroup> {
        return this.http.lookup<ProjectCulturePlanLookupGroup>(lookupActions);
    }

    group<ProjectCulturePlanLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectCulturePlanLookupGroup> {
        
        return this.http.group<ProjectCulturePlanLookupGroup>(this.api, params, 'vProjectCulturePlanRecord', lookupActions);
    }

	search(search: any): Observable<ProjectCulturePlan[]> {
        return this.http.search<ProjectCulturePlan[]>(this.api, search);
    }

    get(): Observable<ProjectCulturePlan[]> {
        return this.http.get<ProjectCulturePlan[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectCulturePlanRecord> {
        return this.http.get<vProjectCulturePlanRecord>(this.api, params); 
    }

    post(projectCulturePlan: ProjectCulturePlan): Observable<ProjectCulturePlan> {
        return this.http.post<ProjectCulturePlan>(this.api, projectCulturePlan);
    }

    put(projectCulturePlan: ProjectCulturePlan): Observable<ProjectCulturePlan> {
        return this.http.put<ProjectCulturePlan>(this.api, projectCulturePlan);
    }

    delete(id : number): Observable<ProjectCulturePlan> {
        return this.http.delete<ProjectCulturePlan>(this.api,id);
    }

}
