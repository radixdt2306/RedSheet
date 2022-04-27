import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  KnowledgeGatheringPlan, vKnowledgeGatheringPlan, vKnowledgeGatheringPlanRecord, vUserLookup, } from 'app/database-models';
import { KnowledgeGatheringPlanLookupGroup } from './domain/knowledge-gathering-plan.models';

@Injectable()
export class KnowledgeGatheringPlansService {
	private projectPowerId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectPowers/${this.projectPowerId}/KnowledgeGatheringPlans`,
            childModuleName: 'knowledge-gathering-plans',
            keyName:'knowledgeGatheringPlanId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<KnowledgeGatheringPlanLookupGroup>(lookupActions: LookupAction[]): Promise<KnowledgeGatheringPlanLookupGroup> {
        return this.http.lookup<KnowledgeGatheringPlanLookupGroup>(lookupActions);
    }

    group<KnowledgeGatheringPlanLookupGroup>(projectPowerId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<KnowledgeGatheringPlanLookupGroup> {
		this.projectPowerId = projectPowerId;
        return this.http.group<KnowledgeGatheringPlanLookupGroup>(this.api, params, 'vKnowledgeGatheringPlanRecord', lookupActions);
    }

	// search(projectPowerId: number,search: any): Observable<vKnowledgeGatheringPlan[]> {
	// 	this.projectPowerId = projectPowerId;
    //     return this.http.search<vKnowledgeGatheringPlan[]>(this.api, search);
    // }
    search(search: any): Observable<any> {
        return this.http.search<vUserLookup>(this.api, search,false);
    }

    get(projectPowerId : number): Observable<vKnowledgeGatheringPlan[]> {
		this.projectPowerId = projectPowerId;
        return this.http.get<vKnowledgeGatheringPlan[]>(this.api);
    }

    getBy(projectPowerId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vKnowledgeGatheringPlanRecord> {
		this.projectPowerId = projectPowerId;
        return this.http.get<vKnowledgeGatheringPlanRecord>(this.api, params);
    }

    post(projectPowerId : number,knowledgeGatheringPlan: KnowledgeGatheringPlan): Observable<KnowledgeGatheringPlan> {
		this.projectPowerId = projectPowerId;
        return this.http.post<KnowledgeGatheringPlan>(this.api, knowledgeGatheringPlan);
    } 

    put(projectPowerId : number,knowledgeGatheringPlan: KnowledgeGatheringPlan): Observable<KnowledgeGatheringPlan> {
		this.projectPowerId = projectPowerId;
        return this.http.put<KnowledgeGatheringPlan>(this.api, knowledgeGatheringPlan);
    }

    delete(projectPowerId : number,id : number): Observable<KnowledgeGatheringPlan> {
		this.projectPowerId = projectPowerId;
        return this.http.delete<KnowledgeGatheringPlan>(this.api,id);
    }

}
