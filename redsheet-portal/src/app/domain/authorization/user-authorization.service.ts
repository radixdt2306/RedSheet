import { Injectable, Inject, ReflectiveInjector } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { RxStorage } from "@rx/storage"
import { Http, RequestOptions, Headers } from "@angular/http";
import { API_HOST_URI, RequestHeaders, ResponseResult } from "@rx/http";

import { UserAuthorizationViewModel } from './user-authorization.models';
import { user } from '@rx/security'
@Injectable()
export class UserAuthorizationService {
    private api: string = 'api/userauthorization'
    storage: RxStorage;
    constructor(private http: Http,
        @Inject(API_HOST_URI) private hostUri: string,
        @Inject('RequestHeaders') private requestHeaders: RequestHeaders,
        @Inject('ResponseResult') private responseResult: ResponseResult,
        private requestOptions: RequestOptions) {
        let injector: any = ReflectiveInjector.resolveAndCreate([RxStorage]);
        this.storage = injector.get(RxStorage);
    }

    postAuthorize(data: any): Observable<any> {
        // NEW
        // function getParameterByName(name, url = window.location.href) {
        //     name = name.replace(/[\[\]]/g, '\\$&');
        //     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        //         results = regex.exec(url);
        //     if (!results) return null;
        //     if (!results[2]) return '';
        //     return decodeURIComponent(results[2].replace(/\+/g, ' '));
        // }
        // var ssoKey = getParameterByName('ssoKey');
        // var uid = getParameterByName('uid');
        // var trg = getParameterByName('trg');
        // var url = "?";

        // if (ssoKey != null && uid != null && trg != null){
            
        //     url = url.concat("uid=",uid,"&ssoKey=",ssoKey,"&trg=",trg);
        // }
        // Might be worth trying a redirect, rather than passing stuff through
        // NEW -END-

        var auth = this.storage.local.get('auth');
        // var test = this.http.post(
        //     this.hostUri.concat(this.api, '/', 'authorize'+url),
        //     JSON.stringify(data),
        //     new RequestOptions({ headers: new Headers({ "Content-Type": "application/json", "Authorization": auth }) })).subscribe(t => {
        //         var aUrl = t.json()['AcademyUrl'];
        //         console.log(aUrl);
        //         this.storage.session.save('academyLink', aUrl);
        //         if (aUrl != null){
        //             this.storage.session.save('academyLink', aUrl);
        //         }
        //     });
        var url = "";
        return this.http.post(
            this.hostUri.concat(this.api, '/', 'authorize'+url),
            JSON.stringify(data),
            new RequestOptions({ headers: new Headers({ "Content-Type": "application/json", "Authorization": auth }) }));
    }

    postLogOut(): Observable<any> {
        var auth = this.storage.local.get('auth');
        return this.http.post(this.hostUri.concat(this.api, '/', 'logout'), JSON.stringify({ userId: 3 }), // kept static userId as of now as per given by ajay sir.
            new RequestOptions({ headers: new Headers({ "Content-Type": "application/json", "Authorization": auth }) }));
    }
    checkLock(data: any): Observable<any> {
        let auth = this.storage.local.get('auth');
        return this.http.post(
            this.hostUri.concat('api/recordlocks'),
            JSON.stringify(data),
            new RequestOptions({ headers: new Headers({ "Content-Type": "application/json", "Authorization": auth }) }));
    }

    unLockRecord(data: any): Observable<any> {
        let auth = this.storage.local.get('auth');
        return this.http.delete(
            this.hostUri.concat(`api/recordlocks${data.applicationModuleId}/${data.mainRecordId}/${data.childModuleName}`),
            new RequestOptions({ headers: new Headers({ "Content-Type": "application/json", "Authorization": auth }) }));
    }

}
