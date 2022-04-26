import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';
import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { ModuleContent } from "app/database-models";
import { ModuleContentViewModel, ModuleContentModel, ModuleContentSearchViewModel } from './domain/module-content-multilingual.models';
import { AuthorizeApi } from "@rx/security";

@Injectable()
export class ModuleContentMultilingualService {
    //private api: string = 'api/searchModuleContents'

    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/searchModuleContents`,
            applicationModuleId: 37,
            keyName: 'moduleContentId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }

    private get apiModule(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/moduleContents`,
            applicationModuleId: 37,
            keyName: 'moduleContentId'
        }
        return authorizeApi;
    }
    lookup<ModuleContentMultilingualLookupGroup>(lookupActions: LookupAction[]): Promise<ModuleContentMultilingualLookupGroup> {
        return this.http.lookup<ModuleContentMultilingualLookupGroup>(lookupActions);
    }
    searchModuleContents(moduleContentModel: ModuleContentModel): Observable<ModuleContentViewModel[]> {
        return this.http.post<ModuleContentViewModel[]>(this.api, moduleContentModel,false);
    }
    post(translationText: any): Observable<ModuleContent> {
        return this.http.post<ModuleContent>(this.apiModule, translationText);
    }
    put(translationText: any): Observable<string> {
        return this.http.put<string>(this.apiModule, translationText);
    }
    delete(id: number): Observable<number> {
        return this.http.delete<number>(this.apiModule, id);
    }
}
