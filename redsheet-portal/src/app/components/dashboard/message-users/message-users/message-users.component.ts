import { Component, OnInit } from '@angular/core';
import { RxStorage } from '@rx/storage';
import { user } from '@rx/security';
import { RxPopup,RxToast } from '@rx/view';
import { MessageUsersService } from '../message-users.service';
import { UsersService } from 'app/components/users/users.service';

@Component({
  templateUrl: './message-users.component.html',
})
export class MessageUsersComponent implements OnInit {

  users:any[]=[];
  project:any;
  data:any;
  displayMessage:string="";
  message:string="";
  isSent:boolean=false;
  isCheckToAdd:boolean;
  MessageObject={ProjectId:new Number,EmailTo:new Array<string>(),EmailFrom:'',EmailSubject:'',EmailMessage:'',EmailStatus:'SENT',IsSystemGenerated:false,UserId:new Number,UpdatedOn:"",UpdatedBy:new Number,GetReply:false,IsSend:false};
  
  constructor(
    private storage:RxStorage,
    private popup:RxPopup,
    private toast:RxToast,
    private messageUsersService:MessageUsersService,
    private usersService:UsersService
    ) {}

  ngOnInit() {    
    this.data = user.data;

    this.MessageObject.ProjectId=this.project.projectId;
    this.MessageObject.EmailFrom=this.data.userName;
    this.MessageObject.EmailSubject = this.project.projectName;
    this.MessageObject.UserId = this.data.userId;
    this.MessageObject.UpdatedBy = this.data.userId;

    if(this.project.projectId)
    {
      this.usersService.GetProjectUsers(Number(this.project.projectId)).subscribe
      (
          (res:any) =>{
            if(res == false)
            {
              this.users=[];
              this.displayMessage="No data found for member";
            }
            else if(res.result)
            {
              this.users=[];
              this.users = (!res.result) ? [] : res.result;
              this.users.filter(x=>{if(x.userId==this.data.userId){this.MessageObject.EmailFrom=x.email;};});
              if(this.users.length==1 && this.users[0].userId == this.data.userId)
              {
                this.displayMessage="It seems like you are the only member in project now";
              }
            }
            else{
              this.users=[];
            }
          },
          (error)=>{
            this.users=[];
          }
      )
    }
  }


  AddRemoveRecipents(event , recipent:any)
  {
      var value = (event.target as HTMLInputElement).checked;
      if(value)
      {
        this.MessageObject.EmailTo.push(recipent);
      }
      else
      {
        this.MessageObject.EmailTo.remove(recipent);
      }
  }

  SendMessage()
  {
    this.MessageObject.EmailMessage=this.message;
    this.MessageObject.IsSend=this.isSent;
    
    this.messageUsersService.SendMessageToUsers(this.MessageObject).subscribe
    (
      (res:any)=>
      {
        if(res.sent==true && res.store==true)
        {
          this.toast.show("Email Sent Successfully");
          this.Cancel();
        }
        else if(res.store==true && this.isSent==false)
        {
          this.toast.show("Message Sent Successfully");
          this.Cancel();
        }
        else if(res.store==false && this.isSent==false)
        {
          this.toast.show("Message Sent Failed" , {status:'error'});
          this.Cancel()
        }
        else if(res.sent==false && this.isSent==true)
        {
          this.toast.show("Email Sent Failed" , {status:'error'});
          this.Cancel()
        }
      },
      (error)=>
      {
        this.Cancel();
      }
    )
  }

  Cancel()
  {
    this.popup.hide(MessageUsersComponent);
  }

}
