import { Component, Input, OnInit } from '@angular/core';
import { RxPopup } from '@rx/view';

@Component({
  // selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  // styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnInit {

  constructor(private popup : RxPopup) { }

  @Input() emailTransactionInput:any;

  emailTransaction:any;
  isCheck:boolean=false;
  message:string = "";
  ngOnInit() {
    this.emailTransaction = this.emailTransactionInput;
    console.log(this.emailTransaction);
  }

  SendMessage()
  {
    this.emailTransaction.EmailMessage = this.message;
    console.log(this.emailTransaction);
  }

  Cancle()
  {
    this.emailTransaction = null;
    this.isCheck=false;
    this.popup.hide(EmailReplyComponent);
  }

}
