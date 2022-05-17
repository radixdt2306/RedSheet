import { Injectable } from '@angular/core';
import { EmailTransaction } from 'app/database-models/email-transaction';
import { RxHttp } from '@rx/http';
import { AuthorizeApi } from "@rx/security";

@Injectable()
export class EmailReplyService {

  constructor(private http:RxHttp) { }

  private get api(): AuthorizeApi{
    var authorizeApi : AuthorizeApi = {
        api: `api/EmailTransaction/Reply`,
        applicationModuleId: 35,
        keyName: 'emailTransactionId'
      }
      return authorizeApi;
  }

  ReplyEmailMessage(email:any)
  {
    return this.http.post(this.api,email,false);
  }

}
