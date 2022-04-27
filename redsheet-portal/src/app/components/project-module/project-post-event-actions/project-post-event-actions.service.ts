import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectPostEventAction, vProjectPostEventAction, vProjectPostEventActionRecord, vUserLookup, } from 'app/database-models';
import { ProjectPostEventActionLookupGroup } from './domain/project-post-event-action.models';

@Injectable()
export class ProjectPostEventActionsService {
    private projectModuleId: number;
    private projectPostEventActionId : number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.projectModuleId}/ProjectPostEventActions`,
            childModuleName: 'project-post-event-actions',
            //applicationModuleId:5131,
            keyName:'projectPostEventActionId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectPostEventActionLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectPostEventActionLookupGroup> {
        return this.http.lookup<ProjectPostEventActionLookupGroup>(lookupActions);
    }

    group<ProjectPostEventActionLookupGroup>(projectModuleId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectPostEventActionLookupGroup> {
		this.projectModuleId = projectModuleId;
        return this.http.group<ProjectPostEventActionLookupGroup>(this.api, params, 'vProjectPostEventActionRecord', lookupActions);
    }

	// search(projectModuleId: number,search: any): Observable<vProjectPostEventAction[]> {
	// 	this.projectModuleId = projectModuleId;
    //     return this.http.search<vProjectPostEventAction[]>(this.api, search);
    // }
    search(search: any): Observable<any> {
        return this.http.search<vUserLookup>(this.api, search,false);
    }

    get(projectModuleId : number): Observable<vProjectPostEventAction[]> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vProjectPostEventAction[]>(this.api);
    }

    getBy(projectModuleId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectPostEventActionRecord> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vProjectPostEventActionRecord>(this.api, params);
    }

    post(projectModuleId : number,projectPostEventAction: ProjectPostEventAction): Observable<ProjectPostEventAction> {
		this.projectModuleId = projectModuleId;
        return this.http.post<ProjectPostEventAction>(this.api, projectPostEventAction);
    } 

    put(projectModuleId : number,projectPostEventAction: ProjectPostEventAction): Observable<ProjectPostEventAction> {
		this.projectModuleId = projectModuleId;
        return this.http.put<ProjectPostEventAction>(this.api, projectPostEventAction);
    }

    delete(projectPostEventActionId : number,id : number): Observable<ProjectPostEventAction> {
		this.projectPostEventActionId = projectPostEventActionId;
        return this.http.delete<ProjectPostEventAction>(this.api,id);
    }

}
