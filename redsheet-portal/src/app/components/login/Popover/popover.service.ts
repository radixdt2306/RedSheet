import {Injectable } from "@angular/core";
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';

@Injectable()
export class popoverService {
    // private api: string = 'api/dashboard/employeeworkpermitalert'

    constructor(
        private http: RxHttp
    ) { }

    // get(): Observable<EmployeeWorkPermitAlertViewModel[]> {
    //     return this.http.get<EmployeeWorkPermitAlertViewModel[]>(this.api);
    // }
}
