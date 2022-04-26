import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  ProjectStakeholder, vProjectStakeholder, vProjectStakeholderRecord, } from 'app/database-models';
import { ProjectStakeholderLookupGroup, StakeholderCommunicationModeViewModels } from './domain/project-stakeholder.models';

@Injectable()
export class ProjectStakeholdersService {
   
    private projectModuleId :number = 0;
	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api:`api/projectmodules/${this.projectModuleId}/ProjectStakeholders`,
            //api: `api/ProjectStakeholders`,
            applicationModuleId: 5085,
            keyName:'projectStakeholderId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectStakeholderLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectStakeholderLookupGroup> {
        return this.http.lookup<ProjectStakeholderLookupGroup>(lookupActions);
    }

    group<ProjectStakeholderLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectStakeholderLookupGroup> {
        return this.http.group<ProjectStakeholderLookupGroup>(this.api, params, 'vProjectStakeholderRecord', lookupActions);
    }

	search(search: any): Observable<vProjectStakeholder[]> {
        return this.http.search<vProjectStakeholder[]>(this.api, search);
    }

    get(projectModuleId:number): Observable<vProjectStakeholder[]> {
        this.projectModuleId = projectModuleId;
        return this.http.get<vProjectStakeholder[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectStakeholderRecord> {
        return this.http.get<vProjectStakeholderRecord>(this.api, params); 
    }

    post(projectStakeholder: ProjectStakeholder): Observable<ProjectStakeholder> {
        return this.http.post<ProjectStakeholder>(this.api, projectStakeholder);
    }

    put(projectStakeholder: StakeholderCommunicationModeViewModels): Observable<ProjectStakeholder> {
        return this.http.put<ProjectStakeholder>(this.api, projectStakeholder);
    }

    delete(id : number): Observable<ProjectStakeholder> {
        return this.http.delete<ProjectStakeholder>(this.api,id);
    }

}
