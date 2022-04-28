import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { EmailTransaction, } from "app/database-models/email-transaction";
import { AuthorizeApi } from "@rx/security";


@Injectable()
export class EmailTransactionService {

  constructor(
    private http:RxHttp
  ) { }
private get api(): AuthorizeApi{
  var authorizeApi : AuthorizeApi = {
      api: `api/EmailTransaction`,
      applicationModuleId: 35,
      keyName: 'emailTransactionId'
    }
    return authorizeApi;
  }

  
	search(search: any): Observable<any> {
    return this.http.search<EmailTransaction[]>(this.api, search,false);
  }
  get(): Observable<EmailTransaction[]> {
    return this.http.get<EmailTransaction[]>(this.api);
  }
  put(emailTransaction: EmailTransaction): Observable<EmailTransaction> {
    return this.http.put<EmailTransaction>(this.api, emailTransaction);
  } 
}

