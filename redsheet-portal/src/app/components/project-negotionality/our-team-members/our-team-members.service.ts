import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  OurTeamMember, vOurTeamMember, } from 'app/database-models';
import { OurTeamMemberLookupGroup } from './domain/our-team-member.models';

@Injectable()
export class OurTeamMembersService {
	private projectNegotionalityId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectNegotionalities/${this.projectNegotionalityId}/OurTeamMembers`,
            childModuleName: 'our-team-members',
            keyName:'ourTeamMemberId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<OurTeamMemberLookupGroup>(lookupActions: LookupAction[]): Promise<OurTeamMemberLookupGroup> {
        return this.http.lookup<OurTeamMemberLookupGroup>(lookupActions);
    }

    group<OurTeamMemberLookupGroup>(projectNegotionalityId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<OurTeamMemberLookupGroup> {
		this.projectNegotionalityId = projectNegotionalityId;
        return this.http.group<OurTeamMemberLookupGroup>(this.api, params, 'ourTeamMember', lookupActions);
    }

	search(projectNegotionalityId: number,search: any): Observable<vOurTeamMember[]> {
		this.projectNegotionalityId = projectNegotionalityId;
        return this.http.search<vOurTeamMember[]>(this.api, search);
    }

    get(projectNegotionalityId : number): Observable<vOurTeamMember[]> {
		this.projectNegotionalityId = projectNegotionalityId;
        return this.http.get<vOurTeamMember[]>(this.api);
    }

    getBy(projectNegotionalityId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<OurTeamMember> {
		this.projectNegotionalityId = projectNegotionalityId;
        return this.http.get<OurTeamMember>(this.api, params);
    }

    post(projectNegotionalityId : number,ourTeamMember: OurTeamMember): Observable<OurTeamMember> {
		this.projectNegotionalityId = projectNegotionalityId;
        return this.http.post<OurTeamMember>(this.api, ourTeamMember);
    } 

    put(projectNegotionalityId : number,ourTeamMember: OurTeamMember): Observable<OurTeamMember> {
		this.projectNegotionalityId = projectNegotionalityId;
        return this.http.put<OurTeamMember>(this.api, ourTeamMember);
    }

    delete(projectNegotionalityId : number,id : number): Observable<OurTeamMember> {
		this.projectNegotionalityId = projectNegotionalityId;
        return this.http.delete<OurTeamMember>(this.api,id);
    }

}
