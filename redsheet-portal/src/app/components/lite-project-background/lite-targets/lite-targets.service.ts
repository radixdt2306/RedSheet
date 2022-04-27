import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  LiteTarget, vLiteTarget, vLiteTargetRecord, } from 'app/database-models';
import { LiteTargetLookupGroup } from './domain/lite-target.models';

@Injectable()
export class LiteTargetsService {
	private liteProjectBackgroundId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/LiteProjectBackgrounds/${this.liteProjectBackgroundId}/LiteTargets`,
            childModuleName: 'lite-targets',
            keyName:'liteTargetId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<LiteTargetLookupGroup>(lookupActions: LookupAction[]): Promise<LiteTargetLookupGroup> {
        return this.http.lookup<LiteTargetLookupGroup>(lookupActions);
    }

    group<LiteTargetLookupGroup>(liteProjectBackgroundId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<LiteTargetLookupGroup> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.group<LiteTargetLookupGroup>(this.api, params, 'vLiteTargetRecord', lookupActions);
    }

	search(liteProjectBackgroundId: number,search: any): Observable<vLiteTarget[]> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.search<vLiteTarget[]>(this.api, search);
    }

    get(liteProjectBackgroundId : number): Observable<vLiteTarget[]> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.get<vLiteTarget[]>(this.api);
    }

    getBy(liteProjectBackgroundId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vLiteTargetRecord> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.get<vLiteTargetRecord>(this.api, params);
    }

    post(liteProjectBackgroundId : number,liteTarget: LiteTarget): Observable<LiteTarget> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.post<LiteTarget>(this.api, liteTarget);
    } 

    put(liteProjectBackgroundId : number,liteTarget: LiteTarget): Observable<LiteTarget> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.put<LiteTarget>(this.api, liteTarget);
    }

    delete(liteProjectBackgroundId : number,id : number): Observable<LiteTarget> {
		this.liteProjectBackgroundId = liteProjectBackgroundId;
        return this.http.delete<LiteTarget>(this.api,id);
    }

}
