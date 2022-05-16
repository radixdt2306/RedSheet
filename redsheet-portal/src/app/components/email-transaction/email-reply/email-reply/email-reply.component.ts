import { Component, Input, OnInit } from '@angular/core';
import { RxPopup,RxToast } from '@rx/view';
import { EmailTransaction } from 'app/database-models/email-transaction';
import { EmailReplyService } from '../email-reply.service';
import { RxStorage } from '@rx/storage';
@Component({
  // selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  // styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnInit {

  constructor(
    private emailReplyService:EmailReplyService,
    private popup : RxPopup,
    private storage: RxStorage,
    private toast : RxToast
  ) 
  { }

  @Input() emailTransactionInput:any;

  emailTransaction:any;
  emailTo:string;
  emailFrom:string;
  isCheck:boolean=false;
  message:string = "";
  data:any;

  ngOnInit() {
    this.emailTransaction = this.emailTransactionInput;
    console.log(this.emailTransaction);

    this.data = this.storage.local.get('data');

    this.emailTransaction.UserId = this.data.userId;
  }

  SendMessage()
  {
    this.emailTransaction.EmailMessage = this.message;
    this.emailTransaction.EmailStatus = 'SENT';
    this.emailTransaction.IsSend = this.isCheck;
    console.log(this.emailTransaction);
    this.emailReplyService.ReplyEmailMessage(this.emailTransaction).subscribe(
      (res:any)=>
      {
        if(res.sent==true && res.store==true)
        {
          console.log("send success",res);
          this.toast.show("Email Sent Successfully");
          this.Cancle();
        }
        else if(res.store==true && res.sent==false && this.isCheck==true)
        {
          console.log("Message store" , "email not sent");
          this.toast.show("Message Store");
          this.toast.show("Email Sent Failed",{status:'error'});
          this.Cancle();
        }
        else if(res.store==true && res.sent==false)
        {
          console.log("Message store");
          this.toast.show("Message Store");
          this.Cancle();
        }
        else if(res.store==false && res.sent==false)
        {
          console.log("Message not store" , "email not sent");
          this.toast.show("Message not Store" , {status:'error'});
          this.toast.show("Email Sent Failed",{status:'error'});
          this.Cancle()
        }
      },
      (error)=>
      {
        console.log("Message not store" , "email not sent");
        this.toast.show("Message not Store" , {status:'error'});
        this.toast.show("Email Sent Failed",{status:'error'});
        this.Cancle()
      }
    );
  }

  Cancle()
  {
    this.emailTransaction = null;
    this.isCheck=false;
    this.popup.hide(EmailReplyComponent);
  }

}
