import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectGameDetail, vProjectGameDetailRecord, } from 'app/database-models';
import { ProjectGameDetailLookupGroup } from './domain/project-game-detail.models';
import { ProjectGameDetailsModule } from 'app/components/project-game/project-game-details/project-game-details.module';

@Injectable()
export class ProjectGameDetailsService {
   
	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectGameDetails`,
            applicationModuleId: 5091,
            keyName:'projectGameDetailId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectGameDetailLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectGameDetailLookupGroup> {
        return this.http.lookup<ProjectGameDetailLookupGroup>(lookupActions);
    }

    group<ProjectGameDetailLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectGameDetailLookupGroup> {
        return this.http.group<ProjectGameDetailLookupGroup>(this.api, params, 'vProjectGameDetailRecord', lookupActions);
    }

	// search(search: any): Observable<ProjectGameDetail[]> {
    //     return this.http.search<ProjectGameDetail[]>(this.api, search);
    // }

    search(search: any): Observable<any> {
        return this.http.search<any>(this.api, search,false);
    }

    get(): Observable<ProjectGameDetail[]> {
        return this.http.get<ProjectGameDetail[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<ProjectGameDetail> {
        return this.http.get<ProjectGameDetail>(this.api, params); 
    }

    post(projectGameDetail: ProjectGameDetail): Observable<ProjectGameDetail> {
        return this.http.post<ProjectGameDetail>(this.api, projectGameDetail);
    }

    put(projectGameDetail: ProjectGameDetail): Observable<ProjectGameDetail> {
        return this.http.put<ProjectGameDetail>(this.api, projectGameDetail);
    }

    delete(id : number): Observable<ProjectGameDetail> {
        return this.http.delete<ProjectGameDetail>(this.api,id);
    }

}
