import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  NanoDiscussionSequence, vNanoDiscussionSequence, vNanoDiscussionSequenceRecord, } from 'app/database-models';
import { NanoDiscussionSequenceLookupGroup } from './domain/nano-discussion-sequence.models';
import { debug } from 'util';

@Injectable()
export class NanoDiscussionSequencesService {
	private projectModuleId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules/${this.projectModuleId}/NanoDiscussionSequences`,
            childModuleName: 'nano-discussion-sequences',
            keyName:'nanoDiscussionSequenceId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }
    // NanoProjectNegotiableLookups
    lookup<ProjectModuleLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectModuleLookupGroup> {
        ;
        return this.http.lookup<ProjectModuleLookupGroup>(lookupActions);
    }

    group<NanoDiscussionSequenceLookupGroup>(projectModuleId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<NanoDiscussionSequenceLookupGroup> {
		this.projectModuleId = projectModuleId;
        return this.http.group<NanoDiscussionSequenceLookupGroup>(this.api, params, 'vNanoDiscussionSequenceRecord', lookupActions);
    }

	search(projectModuleId: number,search: any): Observable<vNanoDiscussionSequence[]> {
		this.projectModuleId = projectModuleId;
        return this.http.search<vNanoDiscussionSequence[]>(this.api, search);
    }

    get(projectModuleId : number): Observable<vNanoDiscussionSequence[]> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vNanoDiscussionSequence[]>(this.api);
    }

    getBy(projectModuleId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vNanoDiscussionSequenceRecord> {
		this.projectModuleId = projectModuleId;
        return this.http.get<vNanoDiscussionSequenceRecord>(this.api, params);
    }

    post(projectModuleId : number,nanoDiscussionSequence: NanoDiscussionSequence): Observable<NanoDiscussionSequence> {
		this.projectModuleId = projectModuleId;
        return this.http.post<NanoDiscussionSequence>(this.api, nanoDiscussionSequence);
    } 

    put(projectModuleId : number,nanoDiscussionSequence: NanoDiscussionSequence): Observable<NanoDiscussionSequence> {
		this.projectModuleId = projectModuleId;
        return this.http.put<NanoDiscussionSequence>(this.api, nanoDiscussionSequence);
    }

    delete(projectModuleId : number,id : number): Observable<NanoDiscussionSequence> {
		this.projectModuleId = projectModuleId;
        return this.http.delete<NanoDiscussionSequence>(this.api,id);
    }

}
