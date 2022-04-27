import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { vSecurityAnswer } from "app/database-models";
import { UserCredentialViewModel, SecurityVerificationViewModel, ChangeCredentialViewModel } from "app/components/login/domain/forgot-password.models";
import { UserAuthenticationViewModel, UserCredentialModel } from "app/components/login/domain/login.models";

@Injectable()
export class ForgotPasswordService {
    constructor(
        private http: RxHttp
    ) { }
    private api: string = 'api/userAuthentication/forgotpassword'
    private apiVerification: string = 'api/UserAuthentication/Verification'
    private apiCredential: string = 'api/UserAuthentication/Credential'
    post(userCredentialViewModel: UserCredentialViewModel): Observable<UserAuthenticationViewModel> {
        return this.http.post<UserAuthenticationViewModel>(this.api, userCredentialViewModel,false);
    }
    // postVerification(securityVerificationViewModel: SecurityVerificationViewModel): Observable<string> {
    //     return this.http.post<string>(this.apiVerification, securityVerificationViewModel,false);
    // }
    putCredential(changeCredentialViewModel: ChangeCredentialViewModel): Observable<string> {
        return this.http.put<string>(this.apiCredential, changeCredentialViewModel);
    }
}
