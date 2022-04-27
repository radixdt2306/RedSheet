import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectModuleReview, vProjectModuleReviewRecord, } from 'app/database-models';
import { ProjectModuleReviewLookupGroup } from './domain/project-module-review.models';

@Injectable()
export class ProjectModuleReviewsService {
	private projectModuleId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.projectModuleId}/ProjectModuleReviews`,
            childModuleName: 'project-module-reviews',
            keyName:'projectModuleReviewId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectModuleReviewLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectModuleReviewLookupGroup> {
        return this.http.lookup<ProjectModuleReviewLookupGroup>(lookupActions);
    }

    group<ProjectModuleReviewLookupGroup>(projectModuleId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectModuleReviewLookupGroup> {
		this.projectModuleId = projectModuleId;
        return this.http.group<ProjectModuleReviewLookupGroup>(this.api, params, 'vProjectModuleReviewRecord', lookupActions);
    }

	search(projectModuleId: number,search: any): Observable<ProjectModuleReview[]> {
		this.projectModuleId = projectModuleId;
        return this.http.search<ProjectModuleReview[]>(this.api, search);
    }

    get(projectModuleId : number): Observable<ProjectModuleReview[]> {
		this.projectModuleId = projectModuleId;
        return this.http.get<ProjectModuleReview[]>(this.api);
    }

    getBy(projectModuleId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectModuleReviewRecord> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vProjectModuleReviewRecord>(this.api, params);
    }

    post(projectModuleId : number,projectModuleReview: ProjectModuleReview): Observable<ProjectModuleReview> {
		this.projectModuleId = projectModuleId;
        return this.http.post<ProjectModuleReview>(this.api, projectModuleReview);
    } 

    put(projectModuleId : number,projectModuleReview: ProjectModuleReview): Observable<ProjectModuleReview> {
		this.projectModuleId = projectModuleId;
        return this.http.put<ProjectModuleReview>(this.api, projectModuleReview);
    }

    delete(projectModuleId : number,id : number): Observable<ProjectModuleReview> {
		this.projectModuleId = projectModuleId;
        return this.http.delete<ProjectModuleReview>(this.api,id);
    }

}
