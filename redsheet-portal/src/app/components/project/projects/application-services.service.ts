import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  Project, vProjectRecord, } from 'app/database-models';
import { ProjectLookupGroup } from './domain/project.models';

@Injectable()
export class ApplicationServicesService {    

	private get apiProjectTemplates(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/applicationservices/projectTemplates`,
            applicationModuleId: 34,
            keyName:'projectId'
        }
        return authorizeApi;
    }

    private get apiUser(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/applicationservices/applicationUsers`,
            applicationModuleId: 34,
            keyName:'projectId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    // getProjectTemplates(): Observable<any[]> {
    //     return this.http.get<any[]>(this.apiProjectTemplates);
    // }

    getProjectTemplates(params?: any[] | {        
        [key: string]: any;
    } | RequestQueryParams): Observable<any> {        
        ;
        return this.http.get<any[]>(this.apiProjectTemplates, params); 
    }

// getProjectTemplates(params :string |{[key: string]:string;} | RequestQueryParams): Observable<vProjectRecord> {
//         return this.http.get<vProjectRecord>(this.apiProjectTemplates,params);
//     }

    getApplicationUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUser);
    }
}
