import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectImplementationPlan, vProjectImplementationPlan, vProjectImplementationPlanRecord, } from 'app/database-models';
import { ProjectImplementationPlanLookupGroup } from './domain/project-implementation-plan.models';

@Injectable()
export class ProjectImplementationPlansService {
	private projectModuleId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.projectModuleId}/ProjectImplementationPlans`,
            childModuleName: 'project-implementation-plans',
            //applicationModuleId:5130,
            keyName:'projectImplementationPlanId',
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectImplementationPlanLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectImplementationPlanLookupGroup> {
        return this.http.lookup<ProjectImplementationPlanLookupGroup>(lookupActions);
    }

    group<ProjectImplementationPlanLookupGroup>(projectModuleId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectImplementationPlanLookupGroup> {
		this.projectModuleId = projectModuleId;
        return this.http.group<ProjectImplementationPlanLookupGroup>(this.api, params, 'vProjectImplementationPlanRecord', lookupActions);
    }

	search(projectModuleId: number,search: any): Observable<vProjectImplementationPlan[]> {
		this.projectModuleId = projectModuleId;
        return this.http.search<vProjectImplementationPlan[]>(this.api, search);
    }

    get(projectModuleId : number): Observable<vProjectImplementationPlan[]> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vProjectImplementationPlan[]>(this.api);
    }

    getBy(projectModuleId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectImplementationPlanRecord> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vProjectImplementationPlanRecord>(this.api, params);
    }

    post(projectModuleId : number,projectImplementationPlan: ProjectImplementationPlan): Observable<ProjectImplementationPlan> {
		this.projectModuleId = projectModuleId;
        return this.http.post<ProjectImplementationPlan>(this.api, projectImplementationPlan);
    } 

    put(projectModuleId : number,projectImplementationPlan: ProjectImplementationPlan): Observable<ProjectImplementationPlan> {
		this.projectModuleId = projectModuleId;
        return this.http.put<ProjectImplementationPlan>(this.api, projectImplementationPlan);
    }

    delete(projectModuleId : number,id : number): Observable<ProjectImplementationPlan> {
		this.projectModuleId = projectModuleId;
        return this.http.delete<ProjectImplementationPlan>(this.api,id);
    }

}
