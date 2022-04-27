import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectCarryForward, vProjectCarryForward, vProjectCarryForwardRecord, } from 'app/database-models';
import { ProjectCarryForwardLookupGroup } from './domain/project-carry-forward.models';

@Injectable()
export class ProjectCarryForwardsService {
	private projectModuleId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.projectModuleId}/ProjectCarryForwards`,
            childModuleName: 'project-carry-forwards',
            //applicationModuleId:5129,
            keyName:'projectCarryForwardId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectCarryForwardLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectCarryForwardLookupGroup> {
        return this.http.lookup<ProjectCarryForwardLookupGroup>(lookupActions);
    }

    group<ProjectCarryForwardLookupGroup>(projectModuleId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectCarryForwardLookupGroup> {
		this.projectModuleId = projectModuleId;
        return this.http.group<ProjectCarryForwardLookupGroup>(this.api, params, 'vProjectCarryForwardRecord', lookupActions);
    }

	search(projectModuleId: number,search: any): Observable<vProjectCarryForward[]> {
		this.projectModuleId = projectModuleId;
        return this.http.search<vProjectCarryForward[]>(this.api, search);
    }

    get(projectModuleId : number): Observable<vProjectCarryForward[]> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vProjectCarryForward[]>(this.api);
    }

    getBy(projectModuleId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectCarryForwardRecord> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vProjectCarryForwardRecord>(this.api, params);
    }

    post(projectModuleId : number,projectCarryForward: ProjectCarryForward): Observable<ProjectCarryForward> {
		this.projectModuleId = projectModuleId;
        return this.http.post<ProjectCarryForward>(this.api, projectCarryForward);
    } 

    put(projectModuleId : number,projectCarryForward: ProjectCarryForward): Observable<ProjectCarryForward> {
		this.projectModuleId = projectModuleId;
        return this.http.put<ProjectCarryForward>(this.api, projectCarryForward);
    }

    delete(projectModuleId : number,id : number): Observable<ProjectCarryForward> {
		this.projectModuleId = projectModuleId;
        return this.http.delete<ProjectCarryForward>(this.api,id);
    }

}
