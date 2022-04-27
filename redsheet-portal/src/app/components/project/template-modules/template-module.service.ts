import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";
import { ProjectModule } from 'app/database-models';


@Injectable()
export class TemplateModuleService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/ProjectModules`,
            applicationModuleId: 34,
            keyName:'projectModuleId'
        }
        return authorizeApi;
    }

    //api:string =  `api/ProjectModules`

    constructor(
        private http: RxHttp
    ) { }

    put(projectModule: ProjectModule): Observable<ProjectModule> {
        return this.http.put<ProjectModule>(this.api, projectModule);
    }

    

}
