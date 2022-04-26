import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { RecentActivityAndNotification, } from 'app/database-models';
import { ApplicationConfiguration, ApplicationPage } from "@rx/core";
import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';

@Injectable()
export class ApplicationService {
    private username: string;
    private api: string = 'api/applicationconfigurations'

    constructor(
        private http: RxHttp
    ) { }

    getConfiguration(languageName: string): Observable<any> {
        var cacheKey = ApplicationConfiguration.get("cachedKeys.applicationconfigurations");
        let uri = `api/applicationconfigurations/languages/${languageName}/?_=${cacheKey}`;
        return this.http.get(uri);
    }

    getNotifications(id: number): Observable<any> {
        let uri = `api/applicationconfigurations/notifications/${id}`;
        return this.http.get(uri);
    }

    getLanguages(): Observable<any> {
        var cacheKey = ApplicationConfiguration.get("cachedKeys.languages");
        let uri = `api/masterlookups/languages/?_=${cacheKey}`;
        return this.http.get(uri);
    }

    getModuleContents(languageName: string, actionType: string, applicationModuleId): Observable<any> {
        var cacheKey = ApplicationConfiguration.get("cachedKeys.modulecontents");
        let uri = `api/modulecontents/${languageName}/${actionType}/${applicationModuleId}/?_=${cacheKey}`;
        return this.http.get(uri);
    }

    getCachedKeys(): Observable<any> {
        let uri = 'api/keys';
        return this.http.get(uri);
    }

    get(): Observable<any> {
        return this.http.get<any[]>(this.api);
    }

}
