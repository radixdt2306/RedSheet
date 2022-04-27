import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  NanoProjectNegotiable, vNanoProjectNegotiable, vNanoProjectNegotiableRecord, } from 'app/database-models';
import { NanoProjectNegotiableLookupGroup } from './domain/nano-project-negotiable.models';

@Injectable()
export class NanoProjectNegotiablesService {
	private projectModuleId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.projectModuleId}/NanoProjectNegotiables`,
            childModuleName: 'nano-project-negotiables',
            keyName:'nanoProjectNegotiableId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<NanoProjectNegotiableLookupGroup>(lookupActions: LookupAction[]): Promise<NanoProjectNegotiableLookupGroup> {
        return this.http.lookup<NanoProjectNegotiableLookupGroup>(lookupActions);
    }

    group<NanoProjectNegotiableLookupGroup>(projectModuleId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<NanoProjectNegotiableLookupGroup> {
		this.projectModuleId = projectModuleId;
        return this.http.group<NanoProjectNegotiableLookupGroup>(this.api, params, 'vNanoProjectNegotiableRecord', lookupActions);
    }

	search(projectModuleId: number,search: any): Observable<vNanoProjectNegotiable[]> {
		this.projectModuleId = projectModuleId;
        return this.http.search<vNanoProjectNegotiable[]>(this.api, search);
    }

    get(projectModuleId : number): Observable<vNanoProjectNegotiable[]> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vNanoProjectNegotiable[]>(this.api);
    }

    getBy(projectModuleId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vNanoProjectNegotiableRecord> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vNanoProjectNegotiableRecord>(this.api, params);
    }

    post(projectModuleId : number,nanoProjectNegotiable: NanoProjectNegotiable): Observable<NanoProjectNegotiable> {
		this.projectModuleId = projectModuleId;
        return this.http.post<NanoProjectNegotiable>(this.api, nanoProjectNegotiable);
    } 

    put(projectModuleId : number,nanoProjectNegotiable: NanoProjectNegotiable): Observable<NanoProjectNegotiable> {
		this.projectModuleId = projectModuleId;
        return this.http.put<NanoProjectNegotiable>(this.api, nanoProjectNegotiable);
    }

    delete(projectModuleId : number,id : number): Observable<NanoProjectNegotiable> {
		this.projectModuleId = projectModuleId;
        return this.http.delete<NanoProjectNegotiable>(this.api,id);
    }

}
