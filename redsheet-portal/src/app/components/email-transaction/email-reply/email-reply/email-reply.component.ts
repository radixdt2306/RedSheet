import { Component, Input, OnInit } from '@angular/core';
import { RxPopup,RxToast } from '@rx/view';
import { EmailTransaction } from 'app/database-models/email-transaction';
import { EmailReplyService } from '../email-reply.service';

@Component({
  // selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  // styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnInit {

  constructor(
    private emailReplyService:EmailReplyService,
    private popup : RxPopup,
    private toast : RxToast
  ) 
  { }

  @Input() emailTransactionInput:EmailTransaction;

  emailTransaction:any;
  emailTo:string;
  emailFrom:string;
  isCheck:boolean=false;
  message:string = "";
  ngOnInit() {
    this.emailTransaction = this.emailTransactionInput;
    console.log(this.emailTransaction);
  }

  SendMessage()
  {
    this.emailTransaction.EmailMessage = this.message;
    this.emailTransaction.EmailStatus = 'SENT';
    console.log(this.emailTransaction);
    this.emailReplyService.ReplyEmailMessage(this.emailTransaction).subscribe(
      (res)=>
      {
        if(res==true)
        {
          console.log("send success",res);
          this.toast.show("Email Sent");
        }
        else
        {
          console.log("failed to sent");
          this.toast.show("Sent not success",{status:'error'});  
        }
      },
      (error)=>
      {
        console.log("failed to sent");
        this.toast.show("Sent not success",{status:'error'});
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
