import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  Game, vGameRecord, } from 'app/database-models';
import { GameLookupGroup } from './domain/game.models';

@Injectable()
export class GamesService {
	private projectGameDetailId: number;
    

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectGameDetails/${this.projectGameDetailId}/Games`,
            childModuleName: 'games',
            keyName:'gameId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    lookup<GameLookupGroup>(lookupActions: LookupAction[]): Promise<GameLookupGroup> {
        return this.http.lookup<GameLookupGroup>(lookupActions);
    }

    group<GameLookupGroup>(projectGameDetailId : number, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<GameLookupGroup> {
		this.projectGameDetailId = projectGameDetailId;
        return this.http.group<GameLookupGroup>(this.api, params, 'vGameRecord', lookupActions);
    }

	search(projectGameDetailId: number,search: any): Observable<Game[]> {
		this.projectGameDetailId = projectGameDetailId;
        return this.http.search<Game[]>(this.api, search);
    }

    get(projectGameDetailId : number): Observable<Game[]> {
		this.projectGameDetailId = projectGameDetailId;
        return this.http.get<Game[]>(this.api);
    }

    getBy(projectGameDetailId : number,params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vGameRecord> {
		this.projectGameDetailId = projectGameDetailId;
        return this.http.get<vGameRecord>(this.api, params);
    }

    post(projectGameDetailId : number,game: Game): Observable<Game> {
		this.projectGameDetailId = projectGameDetailId;
        return this.http.post<Game>(this.api, game);
    } 

    put(projectGameDetailId : number,game: Game): Observable<Game> {
		this.projectGameDetailId = projectGameDetailId;
        return this.http.put<Game>(this.api, game);
    }

    delete(projectGameDetailId : number,id : number): Observable<Game> {
		this.projectGameDetailId = projectGameDetailId;
        return this.http.delete<Game>(this.api,id);
    }

}
