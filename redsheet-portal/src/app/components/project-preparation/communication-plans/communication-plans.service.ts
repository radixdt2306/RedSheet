import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  CommunicationPlan, vCommunicationPlan, vCommunicationPlanRecord, } from 'app/database-models';
import { CommunicationPlanLookupGroup } from './domain/communication-plan.models';

@Injectable()
export class CommunicationPlansService {
	private projectPreparationId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectPreparations/${this.projectPreparationId}/CommunicationPlans`,
            childModuleName: 'communication-plans',
            keyName:'communicationPlanId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<CommunicationPlanLookupGroup>(lookupActions: LookupAction[]): Promise<CommunicationPlanLookupGroup> {
        return this.http.lookup<CommunicationPlanLookupGroup>(lookupActions);
    }

    group<CommunicationPlanLookupGroup>(projectPreparationId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<CommunicationPlanLookupGroup> {
		this.projectPreparationId = projectPreparationId;
        return this.http.group<CommunicationPlanLookupGroup>(this.api, params, 'vCommunicationPlanRecord', lookupActions);
    }

	search(projectPreparationId: number,search: any): Observable<vCommunicationPlan[]> {
		this.projectPreparationId = projectPreparationId;
        return this.http.search<vCommunicationPlan[]>(this.api, search);
    }

    get(projectPreparationId : number): Observable<vCommunicationPlan[]> {
		this.projectPreparationId = projectPreparationId;
        return this.http.get<vCommunicationPlan[]>(this.api);
    }

    getBy(projectPreparationId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vCommunicationPlanRecord> {
		this.projectPreparationId = projectPreparationId;
        return this.http.get<vCommunicationPlanRecord>(this.api, params);
    }

    post(projectPreparationId : number,communicationPlan: CommunicationPlan): Observable<CommunicationPlan> {
		this.projectPreparationId = projectPreparationId;
        return this.http.post<CommunicationPlan>(this.api, communicationPlan);
    } 

    put(projectPreparationId : number,communicationPlan: CommunicationPlan): Observable<CommunicationPlan> {
		this.projectPreparationId = projectPreparationId;
        return this.http.put<CommunicationPlan>(this.api, communicationPlan);
    }

    delete(projectPreparationId : number,id : number): Observable<CommunicationPlan> {
		this.projectPreparationId = projectPreparationId;
        return this.http.delete<CommunicationPlan>(this.api,id);
    }

}
