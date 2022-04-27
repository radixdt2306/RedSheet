import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  OurRequirementDetail, vOurRequirementDetail, vOurRequirementDetailRecord, } from 'app/database-models';
import { OurRequirementDetailLookupGroup } from './domain/our-requirement-detail.models';

@Injectable()
export class OurRequirementDetailsService {
	private projectRequirementId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectRequirements/${this.projectRequirementId}/OurRequirementDetails`,
            childModuleName: 'our-requirement-details',
            keyName:'ourRequirementDetailId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<OurRequirementDetailLookupGroup>(lookupActions: LookupAction[]): Promise<OurRequirementDetailLookupGroup> {
        return this.http.lookup<OurRequirementDetailLookupGroup>(lookupActions);
    }

    group<OurRequirementDetailLookupGroup>(projectRequirementId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<OurRequirementDetailLookupGroup> {
		this.projectRequirementId = projectRequirementId;
        return this.http.group<OurRequirementDetailLookupGroup>(this.api, params, 'vOurRequirementDetailRecord', lookupActions);
    }

	search(projectRequirementId: number,search: any): Observable<vOurRequirementDetail[]> {
		this.projectRequirementId = projectRequirementId;
        return this.http.search<vOurRequirementDetail[]>(this.api, search);
    }

    get(projectRequirementId : number): Observable<vOurRequirementDetail[]> {
		this.projectRequirementId = projectRequirementId;
        return this.http.get<vOurRequirementDetail[]>(this.api);
    }

    getBy(projectRequirementId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vOurRequirementDetailRecord> {
		this.projectRequirementId = projectRequirementId;
        return this.http.get<vOurRequirementDetailRecord>(this.api, params);
    }

    post(projectRequirementId : number,ourRequirementDetail: OurRequirementDetail): Observable<OurRequirementDetail> {
		this.projectRequirementId = projectRequirementId;
        return this.http.post<OurRequirementDetail>(this.api, ourRequirementDetail);
    } 

    put(projectRequirementId : number,ourRequirementDetail: OurRequirementDetail): Observable<OurRequirementDetail> {
		this.projectRequirementId = projectRequirementId;
        return this.http.put<OurRequirementDetail>(this.api, ourRequirementDetail);
    }

    delete(projectRequirementId : number,id : number): Observable<OurRequirementDetail> {
		this.projectRequirementId = projectRequirementId;
        return this.http.delete<OurRequirementDetail>(this.api,id);
    }

}
