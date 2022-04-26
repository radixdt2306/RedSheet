import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectCulture, vProjectCultureRecord, } from 'app/database-models';
import { ProjectCultureLookupGroup } from './domain/project-culture.models';

@Injectable()
export class ProjectCulturesService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectCultures`,
            applicationModuleId: 5086,
            keyName:'projectCultureId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectCultureLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectCultureLookupGroup> {
        return this.http.lookup<ProjectCultureLookupGroup>(lookupActions);
    }

    group<ProjectCultureLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectCultureLookupGroup> {
        return this.http.group<ProjectCultureLookupGroup>(this.api, params, 'vProjectCultureRecord', lookupActions);
    }

	search(search: any): Observable<ProjectCulture[]> {
        return this.http.search<ProjectCulture[]>(this.api, search);
    }

    get(): Observable<ProjectCulture[]> {
        return this.http.get<ProjectCulture[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectCultureRecord> {
        return this.http.get<vProjectCultureRecord>(this.api, params); 
    }

    post(projectCulture: ProjectCulture): Observable<ProjectCulture> {
        return this.http.post<ProjectCulture>(this.api, projectCulture);
    }

    put(projectCulture: ProjectCulture): Observable<ProjectCulture> {
        return this.http.put<ProjectCulture>(this.api, projectCulture);
    }

    delete(id : number): Observable<ProjectCulture> {
        return this.http.delete<ProjectCulture>(this.api,id);
    }

}
