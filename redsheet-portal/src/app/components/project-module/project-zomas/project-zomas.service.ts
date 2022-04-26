import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectZoma, } from 'app/database-models';
import { ProjectZomaLookupGroup } from './domain/project-zoma.models';

@Injectable()
export class ProjectZomasService {
	private projectModuleId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.projectModuleId}/ProjectZomas`,
            childModuleName: 'project-zomas',
            keyName:'projectZomaId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectZomaLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectZomaLookupGroup> {
        return this.http.lookup<ProjectZomaLookupGroup>(lookupActions);
    }

    group<ProjectZomaLookupGroup>(projectModuleId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectZomaLookupGroup> {
		this.projectModuleId = projectModuleId;
        return this.http.group<ProjectZomaLookupGroup>(this.api, params, 'ProjectZoma', lookupActions);
    }

	search(projectModuleId: number,search: any): Observable<ProjectZoma[]> {
		this.projectModuleId = projectModuleId;
        return this.http.search<ProjectZoma[]>(this.api, search);
    }

    get(projectModuleId : number): Observable<ProjectZoma[]> {
		this.projectModuleId = projectModuleId;
        return this.http.get<ProjectZoma[]>(this.api);
    }

    getBy(projectModuleId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<ProjectZoma> {
		this.projectModuleId = projectModuleId;
        return this.http.get<ProjectZoma>(this.api, params);
    }

    post(projectModuleId : number,projectZoma: ProjectZoma): Observable<ProjectZoma> {
		this.projectModuleId = projectModuleId;
        return this.http.post<ProjectZoma>(this.api, projectZoma);
    } 

    put(projectModuleId : number,projectZoma: ProjectZoma): Observable<ProjectZoma> {
		this.projectModuleId = projectModuleId;
        return this.http.put<ProjectZoma>(this.api, projectZoma);
    }

    delete(projectModuleId : number,id : number): Observable<ProjectZoma> {
		this.projectModuleId = projectModuleId;
        return this.http.delete<ProjectZoma>(this.api,id);
    }

}
