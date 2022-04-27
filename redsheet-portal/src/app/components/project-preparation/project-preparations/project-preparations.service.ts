import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectPreparation, vProjectPreparationRecord, } from 'app/database-models';
import { ProjectPreparationLookupGroup } from './domain/project-preparation.models';

@Injectable()
export class ProjectPreparationsService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectPreparations`,
            applicationModuleId: 5095,
            keyName:'projectPreparationId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectPreparationLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectPreparationLookupGroup> {
        return this.http.lookup<ProjectPreparationLookupGroup>(lookupActions);
    }

    group<ProjectPreparationLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectPreparationLookupGroup> {
        return this.http.group<ProjectPreparationLookupGroup>(this.api, params, 'vProjectPreparationRecord', lookupActions);
    }

	search(search: any): Observable<ProjectPreparation[]> {
        return this.http.search<ProjectPreparation[]>(this.api, search);
    }

    get(): Observable<ProjectPreparation[]> {
        return this.http.get<ProjectPreparation[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectPreparationRecord> {
        return this.http.get<vProjectPreparationRecord>(this.api, params); 
    }

    post(projectPreparation: ProjectPreparation): Observable<ProjectPreparation> {
        return this.http.post<ProjectPreparation>(this.api, projectPreparation);
    }

    put(projectPreparation: ProjectPreparation): Observable<ProjectPreparation> {
        return this.http.put<ProjectPreparation>(this.api, projectPreparation);
    }

    delete(id : number): Observable<ProjectPreparation> {
        return this.http.delete<ProjectPreparation>(this.api,id);
    }

}
