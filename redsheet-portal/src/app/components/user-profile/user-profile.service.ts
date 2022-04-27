import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { User } from "app/database-models";
import { AuthorizeApi } from "@rx/security";
import { UserProfileModel } from 'app/components/user-profile/domain/user-profile.model';


@Injectable()
export class UserProfileService {
    //private api: string = 'api/UserProfile'
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/UserProfile`,
            applicationModuleId: 32,
            keyName: 'userId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }
    get(): Observable<UserProfileModel> {
        return this.http.get<UserProfileModel>(this.api);
    }
    
}
