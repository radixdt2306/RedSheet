import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './message-users.component.html',
})
export class MessageUsersComponent implements OnInit {

  users:any;

  MessageObject={ProjectId:'',ProjectModuleId:'',EmailTo:[],EmailFrom:'',EmailSubject:'',EmailMessage:'',UserId:'',UpdateBy:'',isSend:''}
  isCheckToAdd:boolean;
  constructor() {}

  ngOnInit() {
  }

  AddRemoveRecipents( recipent:any)
  {

      // this.MessageObject.EmailTo.push(recipent);
      console.log("messageModule push"  , this.isCheckToAdd);
      // this.MessageObject.EmailTo.remove(recipent);
      console.log("messageModule remove"  , this.isCheckToAdd);
  }

}
