import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { PasswordPolicy } from "app/database-models";
import { AuthorizeApi } from "@rx/security";

@Injectable()
export class PasswordPolicyService {
    constructor(
        private http: RxHttp
    ) { }
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/passwordPolicy`,
            applicationModuleId: 1040,
            keyName: 'passwordPolicyId'
        }
        return authorizeApi;
    }
    get(): Observable<PasswordPolicy> {
        return this.http.get<PasswordPolicy>(this.api);
    }
    put(passwordPolicy: PasswordPolicy): Observable<PasswordPolicy> {
        return this.http.put<PasswordPolicy>(this.api, passwordPolicy);
    }
}
