import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  NanoTheirBatna, vNanoTheirBatna, vNanoTheirBatnaRecord, } from 'app/database-models';
import { NanoTheirBatnaLookupGroup } from './domain/nano-their-batna.models';

@Injectable()
export class NanoTheirBatnasService {
	private projectModuleId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.projectModuleId}/NanoTheirBatnas`,
            childModuleName: 'nano-their-batnas',
            keyName:'nanoTheirBatnaId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<NanoTheirBatnaLookupGroup>(lookupActions: LookupAction[]): Promise<NanoTheirBatnaLookupGroup> {
        return this.http.lookup<NanoTheirBatnaLookupGroup>(lookupActions);
    }

    group<NanoTheirBatnaLookupGroup>(projectModuleId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<NanoTheirBatnaLookupGroup> {
		this.projectModuleId = projectModuleId;
        return this.http.group<NanoTheirBatnaLookupGroup>(this.api, params, 'vNanoTheirBatnaRecord', lookupActions);
    }

	search(projectModuleId: number,search: any): Observable<vNanoTheirBatna[]> {
		this.projectModuleId = projectModuleId;
        return this.http.search<vNanoTheirBatna[]>(this.api, search);
    }

    get(projectModuleId : number): Observable<vNanoTheirBatna[]> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vNanoTheirBatna[]>(this.api);
    }

    getBy(projectModuleId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vNanoTheirBatnaRecord> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vNanoTheirBatnaRecord>(this.api, params);
    }

    post(projectModuleId : number,nanoTheirBatna: NanoTheirBatna): Observable<NanoTheirBatna> {
		this.projectModuleId = projectModuleId;
        return this.http.post<NanoTheirBatna>(this.api, nanoTheirBatna);
    } 

    put(projectModuleId : number,nanoTheirBatna: NanoTheirBatna): Observable<NanoTheirBatna> {
		this.projectModuleId = projectModuleId;
        return this.http.put<NanoTheirBatna>(this.api, nanoTheirBatna);
    }

    delete(projectModuleId : number,id : number): Observable<NanoTheirBatna> {
		this.projectModuleId = projectModuleId;
        return this.http.delete<NanoTheirBatna>(this.api,id);
    }

}
