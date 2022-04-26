import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  LiteOurTeamMember, vLiteOurTeamMember, vLiteOurTeamMemberRecord, } from 'app/database-models';
import { LiteOurTeamMemberLookupGroup } from './domain/lite-our-team-member.models';

@Injectable()
export class LiteOurTeamMembersService {
	private liteProjectBackgroundId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/LiteProjectBackgrounds/${this.liteProjectBackgroundId}/LiteOurTeamMembers`,
            childModuleName: 'lite-our-team-members',
            keyName:'liteOurTeamMemberId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<LiteOurTeamMemberLookupGroup>(lookupActions: LookupAction[]): Promise<LiteOurTeamMemberLookupGroup> {
        return this.http.lookup<LiteOurTeamMemberLookupGroup>(lookupActions);
    }

    group<LiteOurTeamMemberLookupGroup>(liteProjectBackgroundId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<LiteOurTeamMemberLookupGroup> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.group<LiteOurTeamMemberLookupGroup>(this.api, params, 'vLiteOurTeamMemberRecord', lookupActions);
    }

	search(liteProjectBackgroundId: number,search: any): Observable<vLiteOurTeamMember[]> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.search<vLiteOurTeamMember[]>(this.api, search);
    }

    get(liteProjectBackgroundId : number): Observable<vLiteOurTeamMember[]> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.get<vLiteOurTeamMember[]>(this.api);
    }

    getBy(liteProjectBackgroundId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vLiteOurTeamMemberRecord> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.get<vLiteOurTeamMemberRecord>(this.api, params);
    }

    post(liteProjectBackgroundId : number,liteOurTeamMember: LiteOurTeamMember): Observable<LiteOurTeamMember> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.post<LiteOurTeamMember>(this.api, liteOurTeamMember);
    } 

    put(liteProjectBackgroundId : number,liteOurTeamMember: LiteOurTeamMember): Observable<LiteOurTeamMember> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.put<LiteOurTeamMember>(this.api, liteOurTeamMember);
    }

    delete(liteProjectBackgroundId : number,id : number): Observable<LiteOurTeamMember> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.delete<LiteOurTeamMember>(this.api,id);
    }

}
