import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  NanoOurBatna, vNanoOurBatna, vNanoOurBatnaRecord, } from 'app/database-models';
import { NanoOurBatnaLookupGroup } from './domain/nano-our-batna.models';

@Injectable()
export class NanoOurBatnasService {
	private projectModuleId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.projectModuleId}/NanoOurBatnas`,
            childModuleName: 'nano-our-batnas',
            keyName:'nanoOurBatnaId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<NanoOurBatnaLookupGroup>(lookupActions: LookupAction[]): Promise<NanoOurBatnaLookupGroup> {
        return this.http.lookup<NanoOurBatnaLookupGroup>(lookupActions);
    }

    group<NanoOurBatnaLookupGroup>(projectModuleId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<NanoOurBatnaLookupGroup> {
		this.projectModuleId = projectModuleId;
        return this.http.group<NanoOurBatnaLookupGroup>(this.api, params, 'vNanoOurBatnaRecord', lookupActions);
    }

	search(projectModuleId: number,search: any): Observable<vNanoOurBatna[]> {
		this.projectModuleId = projectModuleId;
        return this.http.search<vNanoOurBatna[]>(this.api, search);
    }

    get(projectModuleId : number): Observable<vNanoOurBatna[]> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vNanoOurBatna[]>(this.api);
    }

    getBy(projectModuleId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vNanoOurBatnaRecord> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vNanoOurBatnaRecord>(this.api, params);
    }

    post(projectModuleId : number,nanoOurBatna: NanoOurBatna): Observable<NanoOurBatna> {
		this.projectModuleId = projectModuleId;
        return this.http.post<NanoOurBatna>(this.api, nanoOurBatna);
    } 

    put(projectModuleId : number,nanoOurBatna: NanoOurBatna): Observable<NanoOurBatna> {
		this.projectModuleId = projectModuleId;
        return this.http.put<NanoOurBatna>(this.api, nanoOurBatna);
    }

    delete(projectModuleId : number,id : number): Observable<NanoOurBatna> {
		this.projectModuleId = projectModuleId;
        return this.http.delete<NanoOurBatna>(this.api,id);
    }

}
