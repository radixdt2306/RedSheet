import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectPower, vProjectPowerRecord, } from 'app/database-models';
import { ProjectPowerLookupGroup } from './domain/project-power.models';

@Injectable()
export class ProjectPowersService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectPowers`,
            applicationModuleId: 5090,
            keyName:'projectPowerId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectPowerLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectPowerLookupGroup> {
        return this.http.lookup<ProjectPowerLookupGroup>(lookupActions);
    }

    group<ProjectPowerLookupGroup>(params: any[] | {
        
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectPowerLookupGroup> {
        return this.http.group<ProjectPowerLookupGroup>(this.api, params, 'vProjectPowerRecord', lookupActions);
    }

	search(search: any): Observable<ProjectPower[]> {
        return this.http.search<ProjectPower[]>(this.api, search);
    }

    get(): Observable<ProjectPower[]> {
        return this.http.get<ProjectPower[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectPowerRecord> {
        return this.http.get<vProjectPowerRecord>(this.api, params); 
    }

    post(projectPower: ProjectPower): Observable<ProjectPower> {    
            
        return this.http.post<ProjectPower>(this.api, projectPower);
    }

    put(projectPower: ProjectPower): Observable<ProjectPower> {
        return this.http.put<ProjectPower>(this.api, projectPower);
    }

    delete(id : number): Observable<ProjectPower> {
        return this.http.delete<ProjectPower>(this.api,id);
    }

}
