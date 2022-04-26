import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  TheirBatna, } from 'app/database-models';
import { TheirBatnaLookupGroup } from './domain/their-batna.models';

@Injectable()
export class TheirBatnasService {
	private projectRequirementId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectRequirements/${this.projectRequirementId}/TheirBatnas`,
            childModuleName: 'their-batnas',
            keyName:'theirBatnaId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<TheirBatnaLookupGroup>(lookupActions: LookupAction[]): Promise<TheirBatnaLookupGroup> {
        return this.http.lookup<TheirBatnaLookupGroup>(lookupActions);
    }

    group<TheirBatnaLookupGroup>(projectRequirementId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<TheirBatnaLookupGroup> {
		this.projectRequirementId = projectRequirementId;
        return this.http.group<TheirBatnaLookupGroup>(this.api, params, 'TheirBatna', lookupActions);
    }

	search(projectRequirementId: number,search: any): Observable<TheirBatna[]> {
		this.projectRequirementId = projectRequirementId;
        return this.http.search<TheirBatna[]>(this.api, search);
    }

    get(projectRequirementId : number): Observable<TheirBatna[]> {
		this.projectRequirementId = projectRequirementId;
        return this.http.get<TheirBatna[]>(this.api);
    }

    getBy(projectRequirementId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<TheirBatna> {
		this.projectRequirementId = projectRequirementId;
        return this.http.get<TheirBatna>(this.api, params);
    }

    post(projectRequirementId : number,theirBatna: TheirBatna): Observable<TheirBatna> {
		this.projectRequirementId = projectRequirementId;
        return this.http.post<TheirBatna>(this.api, theirBatna);
    } 

    put(projectRequirementId : number,theirBatna: TheirBatna): Observable<TheirBatna> {
		this.projectRequirementId = projectRequirementId;
        return this.http.put<TheirBatna>(this.api, theirBatna);
    }

    delete(projectRequirementId : number,id : number): Observable<TheirBatna> {
		this.projectRequirementId = projectRequirementId;
        return this.http.delete<TheirBatna>(this.api,id);
    }

}
