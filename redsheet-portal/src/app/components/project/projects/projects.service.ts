import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi } from "@rx/security";

import { Project, vProjectRecord, } from 'app/database-models';
import { ProjectLookupGroup } from './domain/project.models';

@Injectable()
export class ProjectsService {


    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/Projects`,
            applicationModuleId: 34,
            keyName: 'projectId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<ProjectLookupGroup>(lookupActions: LookupAction[]): Promise<ProjectLookupGroup> {
        return this.http.lookup<ProjectLookupGroup>(lookupActions);
    }

    group<ProjectLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<ProjectLookupGroup> {
        return this.http.group<ProjectLookupGroup>(this.api, params, 'project', lookupActions);
    }

    search(search: any): Observable<any> {
        return this.http.search<Project[]>(this.api, search, false);
    }

    get(): Observable<Project[]> {
        return this.http.get<Project[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<vProjectRecord> {
        return this.http.get<vProjectRecord>(this.api, params);
    }

    post(project: Project): Observable<Project> {
        return this.http.post<Project>(this.api, project);
    }

    put(project: Project): Observable<Project> {
        return this.http.put<Project>(this.api, project);
    }

    delete(id: number): Observable<Project> {
        return this.http.delete<Project>(this.api, id);
    }

    exportHtmlToPdf(projectId: number): Observable<string> {
        let apiForPdfGeneration = this.api;
        apiForPdfGeneration.api = `api/Projects/exportHtmlToPdf?projectId=${projectId}`;
        return this.http.get<any>(apiForPdfGeneration);
        // return this.http.post<Project>(this.api, project);
    }

    createCopy(projectId: number): Observable<Project> {
        let createCopyApi = this.api;
        createCopyApi.api = 'api/Projects/CreateCopy';

        return this.http.post<any>(createCopyApi, projectId);
    }

    closeProject(projectId: number): Observable<Project> {
        let closeProjectApi = this.api;
        closeProjectApi.api = 'api/Projects/CloseProject';

        return this.http.post(closeProjectApi, projectId, false);
    }

    collabaratorsOrReviewersInAllModules(projectId_ProjectModuleAssigneesOrReviewer: any): Observable<Project> {
        
        let collabaratorsOrReviewersInAllModulesApi = this.api;
        collabaratorsOrReviewersInAllModulesApi.api = 'api/Projects/CollabaratorsOrReviewersInAllModules';

        return this.http.post<any>(collabaratorsOrReviewersInAllModulesApi, projectId_ProjectModuleAssigneesOrReviewer);
    }
}
