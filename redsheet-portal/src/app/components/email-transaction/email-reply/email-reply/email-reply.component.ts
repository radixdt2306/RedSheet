import { Component, Input, OnInit } from '@angular/core';
import { RxPopup } from '@rx/view';
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
    private popup : RxPopup
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
        // if(res.Result == "TRUE")
        // {
          console.log("response of email reply");
          // this.Cancle();
        // }
        // else
        // {
        //   console.log("error of email reply");  
        // }
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
