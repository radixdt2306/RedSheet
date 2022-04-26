import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { EmailConfiguration } from "app/database-models";
import { AuthorizeApi } from "@rx/security";

@Injectable()
export class EmailConfigurationService {
    constructor(
        private http: RxHttp
    ) { }
    //private api: string = 'api/EmailConfigurations'
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/EmailConfigurations`,
            applicationModuleId: 35,
            keyName: 'emailConfigurationId'
        }
        return authorizeApi;
    }
    get(): Observable<EmailConfiguration[]> {
        return this.http.get<EmailConfiguration[]>(this.api);
    }
    put(emailConfiguration: EmailConfiguration): Observable<EmailConfiguration> {
        return this.http.put<EmailConfiguration>(this.api, emailConfiguration);
    }
}
