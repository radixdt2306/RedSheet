import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectRequirement, } from 'app/database-models';
import { ProjectRequirementLookupGroup } from './domain/project-requirement.models';

@Injectable()
export class ProjectRequirementsService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectRequirements`,
            applicationModuleId: 5092,
            keyName:'projectRequirementId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectRequirementLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectRequirementLookupGroup> {
        return this.http.lookup<ProjectRequirementLookupGroup>(lookupActions);
    }

    group<ProjectRequirementLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectRequirementLookupGroup> {
        return this.http.group<ProjectRequirementLookupGroup>(this.api, params, 'projectRequirement', lookupActions);
    }

	search(search: any): Observable<ProjectRequirement[]> {
        return this.http.search<ProjectRequirement[]>(this.api, search);
    }

    get(): Observable<ProjectRequirement[]> {
        return this.http.get<ProjectRequirement[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<ProjectRequirement> {
        return this.http.get<ProjectRequirement>(this.api, params); 
    }

    post(projectRequirement: ProjectRequirement): Observable<ProjectRequirement> {
        return this.http.post<ProjectRequirement>(this.api, projectRequirement);
    }

    put(projectRequirement: ProjectRequirement): Observable<ProjectRequirement> {
        return this.http.put<ProjectRequirement>(this.api, projectRequirement);
    }

    delete(id : number): Observable<ProjectRequirement> {
        return this.http.delete<ProjectRequirement>(this.api,id);
    }

}
