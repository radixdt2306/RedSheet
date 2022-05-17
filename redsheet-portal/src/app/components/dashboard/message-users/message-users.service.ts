import { Injectable } from '@angular/core';
import { RxHttp } from '@rx/http';
import { AuthorizeApi } from "@rx/security";


@Injectable()
export class MessageUsersService {

  constructor(private http:RxHttp) { }
  
  private get api(): AuthorizeApi{
    var authorizeApi : AuthorizeApi = {
        api: `api/EmailTransaction/NewMessage`,
        applicationModuleId: 35,
        keyName: 'emailTransactionId'
      }
      return authorizeApi;
    }
  
  SendMessageToUsers(MessageObject)
  {
    return this.http.post(this.api,MessageObject,false);
  }
}
