import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  PowerTypeDetail, vPowerTypeDetail, vPowerTypeDetailRecord, } from 'app/database-models';
import { PowerTypeDetailLookupGroup } from './domain/power-type-detail.models';

@Injectable()
export class PowerTypeDetailsService {
	private projectPowerId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectPowers/${this.projectPowerId}/PowerTypeDetails`,
            childModuleName: 'power-type-details',
            keyName:'powerTypeDetailId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<PowerTypeDetailLookupGroup>(lookupActions: LookupAction[]): Promise<PowerTypeDetailLookupGroup> {
        return this.http.lookup<PowerTypeDetailLookupGroup>(lookupActions);
    }

    group<PowerTypeDetailLookupGroup>(projectPowerId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<PowerTypeDetailLookupGroup> {
		this.projectPowerId = projectPowerId;
        return this.http.group<PowerTypeDetailLookupGroup>(this.api, params, 'vPowerTypeDetailRecord', lookupActions);
    }

	search(projectPowerId: number,search: any): Observable<vPowerTypeDetail[]> {
		this.projectPowerId = projectPowerId;
        return this.http.search<vPowerTypeDetail[]>(this.api, search);
    }

    get(projectPowerId : number): Observable<vPowerTypeDetail[]> {
		this.projectPowerId = projectPowerId;
        return this.http.get<vPowerTypeDetail[]>(this.api);
    }

    getBy(projectPowerId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vPowerTypeDetailRecord> {
		this.projectPowerId = projectPowerId;
        return this.http.get<vPowerTypeDetailRecord>(this.api, params);
    }

    post(projectPowerId : number,powerTypeDetail: PowerTypeDetail): Observable<PowerTypeDetail> {
		this.projectPowerId = projectPowerId;
        return this.http.post<PowerTypeDetail>(this.api, powerTypeDetail);
    } 

    put(projectPowerId : number,powerTypeDetail: PowerTypeDetail): Observable<PowerTypeDetail> {
		this.projectPowerId = projectPowerId;
        return this.http.put<PowerTypeDetail>(this.api, powerTypeDetail);
    }

    delete(projectPowerId : number,id : number): Observable<PowerTypeDetail> {
		this.projectPowerId = projectPowerId;
        return this.http.delete<PowerTypeDetail>(this.api,id);
    }

}
