import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { vSecurityAnswer } from "app/database-models";
import { UserCredentialViewModel, SecurityVerificationViewModel, ChangeCredentialViewModel } from "app/components/login/domain/reset-password.models";
import { UserAuthenticationViewModel, UserCredentialModel } from "app/components/login/domain/login.models";

@Injectable()
export class ResetPasswordService {
    constructor(
        private http: RxHttp
    ) { }
    private api: string = 'api/userAuthentication/resetpassword'
    private apiVerification: string = 'api/UserAuthentication/Verification'
    private apiCredential: string = 'api/UserAuthentication/Credential'
    post(userCredentialViewModel: UserCredentialViewModel): Observable<vSecurityAnswer> {
        return this.http.post<vSecurityAnswer>(this.api, userCredentialViewModel,false);
    }
    postVerification(securityVerificationViewModel: SecurityVerificationViewModel): Observable<string> {
        return this.http.post<string>(this.apiVerification, securityVerificationViewModel,false);
    }
    putCredential(changeCredentialViewModel: ChangeCredentialViewModel): Observable<UserAuthenticationViewModel> {
        return this.http.put<UserAuthenticationViewModel>(this.apiCredential, changeCredentialViewModel);
    }
}
