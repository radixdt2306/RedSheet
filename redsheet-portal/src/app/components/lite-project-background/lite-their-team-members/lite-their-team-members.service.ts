import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  LiteTheirTeamMember, vLiteTheirTeamMember, vLiteTheirTeamMemberRecord, } from 'app/database-models';
import { LiteTheirTeamMemberLookupGroup } from './domain/lite-their-team-member.models';

@Injectable()
export class LiteTheirTeamMembersService {
	private liteProjectBackgroundId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/LiteProjectBackgrounds/${this.liteProjectBackgroundId}/LiteTheirTeamMembers`,
            childModuleName: 'lite-their-team-members',
            keyName:'liteTheirTeamMemberId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<LiteTheirTeamMemberLookupGroup>(lookupActions: LookupAction[]): Promise<LiteTheirTeamMemberLookupGroup> {
        return this.http.lookup<LiteTheirTeamMemberLookupGroup>(lookupActions);
    }

    group<LiteTheirTeamMemberLookupGroup>(liteProjectBackgroundId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<LiteTheirTeamMemberLookupGroup> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.group<LiteTheirTeamMemberLookupGroup>(this.api, params, 'vLiteTheirTeamMemberRecord', lookupActions);
    }

	search(liteProjectBackgroundId: number,search: any): Observable<vLiteTheirTeamMember[]> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.search<vLiteTheirTeamMember[]>(this.api, search);
    }

    get(liteProjectBackgroundId : number): Observable<vLiteTheirTeamMember[]> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.get<vLiteTheirTeamMember[]>(this.api);
    }

    getBy(liteProjectBackgroundId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vLiteTheirTeamMemberRecord> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.get<vLiteTheirTeamMemberRecord>(this.api, params);
    }

    post(liteProjectBackgroundId : number,liteTheirTeamMember: LiteTheirTeamMember): Observable<LiteTheirTeamMember> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.post<LiteTheirTeamMember>(this.api, liteTheirTeamMember);
    } 

    put(liteProjectBackgroundId : number,liteTheirTeamMember: LiteTheirTeamMember): Observable<LiteTheirTeamMember> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.put<LiteTheirTeamMember>(this.api, liteTheirTeamMember);
    }

    delete(liteProjectBackgroundId : number,id : number): Observable<LiteTheirTeamMember> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.delete<LiteTheirTeamMember>(this.api,id);
    }

}
