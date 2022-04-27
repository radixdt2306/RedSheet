import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi} from "@rx/security";

import {  RecentActivityAndNotification, } from 'app/database-models';
import { RecentActivityAndNotificationLookupGroup } from './domain/recent-activity-and-notification.models';

@Injectable()
export class RecentActivityAndNotificationsService {
   

	private get api(): AuthorizeApi {
        var authorizeApi: AuthorizeApi = {
            api: `api/RecentActivityAndNotifications`,
            applicationModuleId: 6149,
            keyName:'recentActivityAndNotificationId'
        }
        return authorizeApi;
    }

    constructor(
        private http: RxHttp
    ) { }

    lookup<RecentActivityAndNotificationLookupGroup>(lookupActions: LookupAction[]): Promise<RecentActivityAndNotificationLookupGroup> {
        return this.http.lookup<RecentActivityAndNotificationLookupGroup>(lookupActions);
    }

    group<RecentActivityAndNotificationLookupGroup>(params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, lookupActions: LookupAction[]): Promise<RecentActivityAndNotificationLookupGroup> {
        return this.http.group<RecentActivityAndNotificationLookupGroup>(this.api, params, 'recentActivityAndNotification', lookupActions);
    }

	search(search: any): Observable<any> {
        return this.http.search<RecentActivityAndNotification[]>(this.api, search,false);
    }

    get(): Observable<RecentActivityAndNotification[]> {
        return this.http.get<RecentActivityAndNotification[]>(this.api);
    }

    getBy(params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): Observable<RecentActivityAndNotification> {
        return this.http.get<RecentActivityAndNotification>(this.api, params); 
    }

    post(recentActivityAndNotification: RecentActivityAndNotification): Observable<RecentActivityAndNotification> {
        return this.http.post<RecentActivityAndNotification>(this.api, recentActivityAndNotification);
    }

    put(recentActivityAndNotification: RecentActivityAndNotification): Observable<RecentActivityAndNotification> {
        
        return this.http.put<RecentActivityAndNotification>(this.api, recentActivityAndNotification);
    }

    delete(id : number): Observable<RecentActivityAndNotification> {
        return this.http.delete<RecentActivityAndNotification>(this.api,id);
    }

}
