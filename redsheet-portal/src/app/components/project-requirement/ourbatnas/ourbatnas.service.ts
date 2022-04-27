import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  Ourbatna, } from 'app/database-models';
import { OurbatnaLookupGroup } from './domain/ourbatna.models';

@Injectable()
export class OurbatnasService {
	private projectRequirementId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectRequirements/${this.projectRequirementId}/Ourbatnas`,
            childModuleName: 'ourbatnas',
            keyName:'ourbatnaId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<OurbatnaLookupGroup>(lookupActions: LookupAction[]): Promise<OurbatnaLookupGroup> {
        return this.http.lookup<OurbatnaLookupGroup>(lookupActions);
    }

    group<OurbatnaLookupGroup>(projectRequirementId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<OurbatnaLookupGroup> {
		this.projectRequirementId = projectRequirementId;
        return this.http.group<OurbatnaLookupGroup>(this.api, params, 'Ourbatna', lookupActions);
    }

	search(projectRequirementId: number,search: any): Observable<Ourbatna[]> {
		this.projectRequirementId = projectRequirementId;
        return this.http.search<Ourbatna[]>(this.api, search);
    }

    get(projectRequirementId : number): Observable<Ourbatna[]> {
		this.projectRequirementId = projectRequirementId;
        return this.http.get<Ourbatna[]>(this.api);
    }

    getBy(projectRequirementId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<Ourbatna> {
		this.projectRequirementId = projectRequirementId;
        return this.http.get<Ourbatna>(this.api, params);
    }

    post(projectRequirementId : number,ourbatna: Ourbatna): Observable<Ourbatna> {
		this.projectRequirementId = projectRequirementId;
        return this.http.post<Ourbatna>(this.api, ourbatna);
    } 

    put(projectRequirementId : number,ourbatna: Ourbatna): Observable<Ourbatna> {
		this.projectRequirementId = projectRequirementId;
        return this.http.put<Ourbatna>(this.api, ourbatna);
    }

    delete(projectRequirementId : number,id : number): Observable<Ourbatna> {
		this.projectRequirementId = projectRequirementId;
        return this.http.delete<Ourbatna>(this.api,id);
    }

}
