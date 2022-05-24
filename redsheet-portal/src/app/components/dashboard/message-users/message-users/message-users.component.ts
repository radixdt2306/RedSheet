import { Component, OnInit } from '@angular/core';
import { RxStorage } from '@rx/storage';
import { user } from '@rx/security';
import { RxPopup,RxToast } from '@rx/view';
import { MessageUsersService } from '../message-users.service';

@Component({
  templateUrl: './message-users.component.html',
})
export class MessageUsersComponent implements OnInit {

  users:any;
  project:any;
  data:any;

  message:string="";
  isSent:boolean=false;
  isCheckToAdd:boolean;
  MessageObject={ProjectId:new Number,EmailTo:new Array<string>(),EmailFrom:'',EmailSubject:'',EmailMessage:'',EmailStatus:'SENT',IsSystemGenerated:false,UserId:new Number,UpdatedOn:"",UpdatedBy:new Number,IsSend:false};
  
  constructor(
    private storage:RxStorage,
    private popup:RxPopup,
    private toast:RxToast,
    private messageUsersService:MessageUsersService
    ) {}

  ngOnInit() {
    this.data = user.data;

    this.MessageObject.ProjectId=this.project.projectId;
    this.MessageObject.EmailSubject = this.project.projectName;
    this.MessageObject.UserId = this.data.userId;
    this.MessageObject.UpdatedBy = this.data.userId;
    this.users.filter(x=>{if(x.userId==this.data.userId){this.MessageObject.EmailFrom=x.email;};});

    console.log("oninit",this.MessageObject);
  }


  AddRemoveRecipents(event , recipent:any)
  {
      var value = (event.target as HTMLInputElement).checked;
      if(value)
      {
        this.MessageObject.EmailTo.push(recipent);
        console.log("messageModule push"  ,this.MessageObject, value);
      }
      else
      {
        this.MessageObject.EmailTo.remove(recipent);
        console.log("messageModule remove"  ,this.MessageObject, value);
      }
  }

  SendMessage()
  {
    this.MessageObject.EmailMessage=this.message;
    this.MessageObject.IsSend=this.isSent;
    console.log(this.MessageObject);
    this.messageUsersService.SendMessageToUsers(this.MessageObject).subscribe
    (
      (res:any)=>
      {
        if(res.sent==true && res.store==true)
        {
          this.toast.show("Email Sent Successfully");
          this.Cancle();
        }
        else if(res.store==true && this.isSent==false)
        {
          this.toast.show("Message Sent Successfully");
          this.Cancle();
        }
        else if(res.store==false && this.isSent==false)
        {
          this.toast.show("Message Sent Failed" , {status:'error'});
          this.Cancle()
        }
        else if(res.sent==false && this.isSent==true)
        {
          this.toast.show("Email Sent Failed" , {status:'error'});
          this.Cancle()
        }
      },
      (error)=>
      {
        this.Cancle();
      }
    )
  }

  Cancle()
  {
    this.message="";
    this.isSent=false;
    this.MessageObject=null;
    console.log(this.MessageObject);
    this.popup.hide(MessageUsersComponent);
  }

}
