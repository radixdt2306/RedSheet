import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  TheirRequirementDetail, vTheirRequirementDetail, vTheirRequirementDetailRecord, } from 'app/database-models';
import { TheirRequirementDetailLookupGroup } from './domain/their-requirement-detail.models';

@Injectable()
export class TheirRequirementDetailsService {
	private projectRequirementId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectRequirements/${this.projectRequirementId}/TheirRequirementDetails`,
            childModuleName: 'their-requirement-details',
            keyName:'theirRequirementDetailId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<TheirRequirementDetailLookupGroup>(lookupActions: LookupAction[]): Promise<TheirRequirementDetailLookupGroup> {
        return this.http.lookup<TheirRequirementDetailLookupGroup>(lookupActions);
    }

    group<TheirRequirementDetailLookupGroup>(projectRequirementId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<TheirRequirementDetailLookupGroup> {
		this.projectRequirementId = projectRequirementId;
        return this.http.group<TheirRequirementDetailLookupGroup>(this.api, params, 'vTheirRequirementDetailRecord', lookupActions);
    }

	search(projectRequirementId: number,search: any): Observable<vTheirRequirementDetail[]> {
		this.projectRequirementId = projectRequirementId;
        return this.http.search<vTheirRequirementDetail[]>(this.api, search);
    }

    get(projectRequirementId : number): Observable<vTheirRequirementDetail[]> {
		this.projectRequirementId = projectRequirementId;
        return this.http.get<vTheirRequirementDetail[]>(this.api);
    }

    getBy(projectRequirementId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vTheirRequirementDetailRecord> {
		this.projectRequirementId = projectRequirementId;
        return this.http.get<vTheirRequirementDetailRecord>(this.api, params);
    }

    post(projectRequirementId : number,theirRequirementDetail: TheirRequirementDetail): Observable<TheirRequirementDetail> {
		this.projectRequirementId = projectRequirementId;
        return this.http.post<TheirRequirementDetail>(this.api, theirRequirementDetail);
    } 

    put(projectRequirementId : number,theirRequirementDetail: TheirRequirementDetail): Observable<TheirRequirementDetail> {
		this.projectRequirementId = projectRequirementId;
        return this.http.put<TheirRequirementDetail>(this.api, theirRequirementDetail);
    }

    delete(projectRequirementId : number,id : number): Observable<TheirRequirementDetail> {
		this.projectRequirementId = projectRequirementId;
        return this.http.delete<TheirRequirementDetail>(this.api,id);
    }

}
