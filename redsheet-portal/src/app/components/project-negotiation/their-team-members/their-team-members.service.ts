import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  TheirTeamMember, vTheirTeamMember, vTheirTeamMemberRecord, } from 'app/database-models';
import { TheirTeamMemberLookupGroup } from './domain/their-team-member.models';

@Injectable()
export class TheirTeamMembersService {
	private projectNegotiationId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectNegotiations/${this.projectNegotiationId}/TheirTeamMembers`,
            childModuleName: 'their-team-members',
            keyName:'theirTeamMemberId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<TheirTeamMemberLookupGroup>(lookupActions: LookupAction[]): Promise<TheirTeamMemberLookupGroup> {
        return this.http.lookup<TheirTeamMemberLookupGroup>(lookupActions);
    }

    group<TheirTeamMemberLookupGroup>(projectNegotiationId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<TheirTeamMemberLookupGroup> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.group<TheirTeamMemberLookupGroup>(this.api, params, 'vTheirTeamMemberRecord', lookupActions);
    }

	search(projectNegotiationId: number,search: any): Observable<vTheirTeamMember[]> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.search<vTheirTeamMember[]>(this.api, search);
    }

    get(projectNegotiationId : number): Observable<vTheirTeamMember[]> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.get<vTheirTeamMember[]>(this.api);
    }

    getBy(projectNegotiationId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vTheirTeamMemberRecord> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.get<vTheirTeamMemberRecord>(this.api, params);
    }

    post(projectNegotiationId : number,theirTeamMember: TheirTeamMember): Observable<TheirTeamMember> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.post<TheirTeamMember>(this.api, theirTeamMember);
    } 

    put(projectNegotiationId : number,theirTeamMember: TheirTeamMember): Observable<TheirTeamMember> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.put<TheirTeamMember>(this.api, theirTeamMember);
    }

    delete(projectNegotiationId : number,id : number): Observable<TheirTeamMember> {
		this.projectNegotiationId = projectNegotiationId;
        return this.http.delete<TheirTeamMember>(this.api,id);
    }

}
