import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';

import { LanguageContent} from 'app/database-models'
import { LanguageContentSearchViewModel } from "./domain/language-content-multilingual.models";
import { LanguageContentViewModel } from "./domain/language-content-multilingual.models"
import { AuthorizeApi } from "@rx/security";
@Injectable()
export class LanguageContentMultilingualService {
    //private api: string = 'api/languageContents'
    private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/languageContents`,
            applicationModuleId: 36,
            keyName: 'languageContentId'
        }
        return authorizeApi;
    }
    constructor(
        private http: RxHttp
    ) { }
    get(): Observable<LanguageContent[]> {
        return this.http.get<LanguageContent[]>(this.api);
    }
    getBy(params?: any[] | { [key: string]: any; } | RequestQueryParams): Observable<LanguageContentViewModel[]> {
        return this.http.get<LanguageContentViewModel[]>(this.api, params);
    }
    delete(id: number): Observable<LanguageContent> {
        return this.http.delete<LanguageContent>(this.api, id);
    }
    put(languageContent: any): Observable<string> {
        return this.http.put<string>(this.api, languageContent);
    }
    lookup<LanguageContentMultilinguallookupGroup>(lookupActions: LookupAction[]): Promise<LanguageContentMultilinguallookupGroup> {
        return this.http.lookup<LanguageContentMultilinguallookupGroup>(lookupActions);
    }
    searchLanguageContents(languageWiseSearchViewModel: LanguageContentSearchViewModel): Observable<LanguageContent[]>
    {
        //return this.http.post<vModulewiseContents[]>(this.api, languageWiseSearchViewModel,false);
        return this.http.get<LanguageContent[]>(this.api);
    }
}
