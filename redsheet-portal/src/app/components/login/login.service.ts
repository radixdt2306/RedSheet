import {Injectable } from "@angular/core";
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { UserAuthenticationViewModel, UserCredentialModel } from "app/components/login/domain/login.models";


@Injectable()
export class LoginService {
    private username: string;
    private api: string = 'api/UserAuthentication/login'

    constructor(
        private http: RxHttp
    ) { }

    post(userCredentialViewModel: UserCredentialModel, uid: string, trg: string, ssoKey:string): Observable<UserAuthenticationViewModel> {
        let api = this.api;
        if (uid != undefined && trg != undefined && ssoKey != undefined) {
            api = this.api + "?uid=" + uid + "&trg=" + trg + "&ssoKey=" + ssoKey;
        }
        return this.http.post<UserAuthenticationViewModel>(api, userCredentialViewModel, false);
    }

    //getBy(username: string, params?: any[] | {
    //    [key: string]: any;
    //} | RequestQueryParams): Observable<UserCredentialViewModel> {
    //    this.username = username;
    //    return this.http.get<UserCredentialViewModel>(this.api, { username: this.username });
    //}


}
