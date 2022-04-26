import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthorizeApi } from "@rx/security"
import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { UsersSearchViewModel, UsersResultModel } from "app/components/users/domain/users.models";
import { User } from "app/database-models";


@Injectable()
export class UsersService {
    private get apiUsers(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/users`,
            applicationModuleId: 8,
            keyName: 'userId'
        }
        return authorizeApi;
    }
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/UsersSearch`,
            applicationModuleId: 8,
            keyName: 'userId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }
    searchUsersList(usersSearch: UsersSearchViewModel): Observable<UsersResultModel[]> {
        return this.http.post<UsersResultModel[]>(this.api, usersSearch,false);
    }
    lookup<UsersLookupGroup>(lookupActions: LookupAction[]): Promise<UsersLookupGroup> {
        return this.http.lookup<UsersLookupGroup>(lookupActions);
    }
    post(user: User): Observable<UsersResultModel[]> {
        return this.http.post<UsersResultModel[]>(this.apiUsers, user);
    }
    put(user: User): Observable<UsersResultModel[]> {
        return this.http.put<UsersResultModel[]>(this.apiUsers, user);
    }
    group<UsersLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<UsersLookupGroup> {
        return this.http.group<UsersLookupGroup>(this.apiUsers, params, 'user', lookupActions);
    }
    delete(id: number): Observable<UsersResultModel[]> {
        return this.http.delete<UsersResultModel[]>(this.apiUsers, id);
    }
    get(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUsers);
    }

}
