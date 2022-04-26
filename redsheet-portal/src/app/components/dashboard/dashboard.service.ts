import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

//import {  Project, vProjectRecord, } from 'app/database-models';
//import { ProjectLookupGroup } from './dashboard.module';

@Injectable()
export class DashboardService {
   
	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/dashboard`,
            applicationModuleId: 5104,
            keyName:''
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }
    
	search(search: any): Observable<any> {
        return this.http.search<any[]>(this.api, search,false);
    }
}
