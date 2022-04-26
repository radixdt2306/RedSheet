import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectModule, vProjectModuleRecord, } from 'app/database-models';
import { ProjectModuleLookupGroup } from './domain/project-module.models';

@Injectable()
export class ProjectModulesService {
   
    private isLeftMenu: boolean;
    
	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules`,
            applicationModuleId: 5099,
            keyName:'projectModuleId'
        }
        return authorizeApi;
    }

    private get apiSearch(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.isLeftMenu}`,
            applicationModuleId: 5099,
            keyName:'projectModuleId'
        }
        return authorizeApi;
    }


    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectModuleLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectModuleLookupGroup> {
        return this.http.lookup<ProjectModuleLookupGroup>(lookupActions);
    }

    group<ProjectModuleLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectModuleLookupGroup> {
        return this.http.group<ProjectModuleLookupGroup>(this.api, params, 'ProjectModule', lookupActions);
    }

	search(isLeftMenu,search: any): Observable<ProjectModule[]> {
        this.isLeftMenu = isLeftMenu;
        return this.http.search<ProjectModule[]>(this.apiSearch, search,false);
    }

    get(): Observable<ProjectModule[]> {
        return this.http.get<ProjectModule[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectModuleRecord> {
        return this.http.get<vProjectModuleRecord>(this.api, params); 
    }

    post(projectModule: ProjectModule): Observable<ProjectModule> {
        return this.http.post<ProjectModule>(this.api, projectModule);
    }

    put(projectModule: ProjectModule): Observable<ProjectModule> {
        return this.http.put<ProjectModule>(this.api, projectModule);
    }

    delete(id : number): Observable<ProjectModule> {
        return this.http.delete<ProjectModule>(this.api,id);
    }

}
