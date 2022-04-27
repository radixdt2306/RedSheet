import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectBackground, } from 'app/database-models';
import { ProjectBackgroundLookupGroup } from './domain/project-background.models';

@Injectable()
export class ProjectBackgroundsService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectBackgrounds`,
            applicationModuleId: 5084,
            keyName:'projectBackgroundId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectBackgroundLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectBackgroundLookupGroup> {
        return this.http.lookup<ProjectBackgroundLookupGroup>(lookupActions);
    }

    group<ProjectBackgroundLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectBackgroundLookupGroup> {
        return this.http.group<ProjectBackgroundLookupGroup>(this.api, params, 'ProjectBackground', lookupActions);
    }

	search(search: any): Observable<ProjectBackground[]> {
        return this.http.search<ProjectBackground[]>(this.api, search);
    }

    get(): Observable<ProjectBackground[]> {
        return this.http.get<ProjectBackground[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<ProjectBackground> {
        return this.http.get<ProjectBackground>(this.api, params); 
    }

    post(projectBackground: ProjectBackground): Observable<ProjectBackground> {
        return this.http.post<ProjectBackground>(this.api, projectBackground);
    }

    put(projectBackground: ProjectBackground): Observable<ProjectBackground> {
        return this.http.put<ProjectBackground>(this.api, projectBackground);
    }

    delete(id : number): Observable<ProjectBackground> {
        return this.http.delete<ProjectBackground>(this.api,id);
    }

}
