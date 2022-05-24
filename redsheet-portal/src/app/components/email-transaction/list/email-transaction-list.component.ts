import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxStorage } from '@rx/storage';
import { user } from '@rx/security';
import { RxToast, RxPopup, RxDialog, DialogClick } from '@rx/view';
import { EmailTransaction } from 'app/database-models/email-transaction';
import { EmailTransactionService } from 'app/components/email-transaction/email-transaction.service';
import { EmailTransactionDomain } from 'app/components/email-transaction/domain/email-transaction.domain';
import { EmailReplyComponent } from '../email-reply/email-reply/email-reply.component';




@Component({
  templateUrl: './email-transaction-list.component.html',
  entryComponents:[EmailReplyComponent]
})
export class EmailTransactionListComponent extends EmailTransactionDomain implements OnInit, OnDestroy {
  showComponent: boolean = false;
  emailTransaction: EmailTransaction[];
  listSubscription: Subscription;
  searchValue: string = "";
  emailCategory: any[] = ["SENT", "RECEIVED"];
  emailCategoryValue: string = "";
  dateOrder: string = "DESCENDING";
  data:any;
  searchFilter = { userId:0 , userEmail:"", searchValue: this.searchValue, dateOrder: this.dateOrder, emailCategory: this.emailCategoryValue }

  isSearchEnable: boolean;

  constructor(
    private emailTransactionService: EmailTransactionService,
    private dialog: RxDialog,
    private storage: RxStorage,
    private router: Router,
    private popup: RxPopup
  ) { super(); }

  ngOnInit(): void {
    this.isSearchEnable = true;
    this.data = user.data;

    this.searchFilter.userId = this.data.userId;
    this.searchFilter.userEmail = this.data.userName;
    this.EmailTransactions();
  }

  // date order toggle 
  DateOrderEmailTransaction() {
    if (this.dateOrder == "ASCENDING") {
      this.dateOrder = "DESCENDING";
      this.searchFilter.dateOrder = this.dateOrder;
    }
    else {
      this.dateOrder = "ASCENDING";
      this.searchFilter.dateOrder = this.dateOrder;
    }
    this.EmailTransactions();
  }

  EmailTransactions() {

    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }

    this.listSubscription = this.emailTransactionService.search({ Query: [this.searchFilter] }).subscribe(emailTransaction => {
      this.emailTransaction = null;
      this.emailTransaction = (!emailTransaction.result) ? [] : emailTransaction.result;
      this.isSearchEnable = true;
      this.showComponent = true;
    });
  }

  SearchEmailTransaction() {
    if (this.isSearchEnable) {
      this.isSearchEnable = false;
      this.searchFilter.searchValue = this.searchValue;
      this.EmailTransactions();
    }
  }

  CategoryEmailTransaction() {
    this.searchFilter.emailCategory = this.emailCategoryValue;
    this.EmailTransactions();
  }
  ResetEmailTransactionFilter() {

    this.searchValue = "";
    this.dateOrder = "DESCENDING";
    this.emailCategoryValue = "";
    this.searchFilter.searchValue = "";
    this.searchFilter.dateOrder = "DESCENDING";
    this.searchFilter.emailCategory = "";

    this.EmailTransactions();
  }

  ReplyToEmail(data:any)
  {
    var data_= new EmailTransaction();
    data_.EmailTransactionId = data.EmailTransactionId;
    data_.ProjectId = data.ProjectId;
    data_.EmailFrom=data.EmailTo;
    data_.EmailTo=data.EmailFrom;
    data_.EmailSubject=data.EmailSubject;
    data_.EmailMessage=data.EmailMessage;
    data_.EmailStatus=data.EmailStatus;
    data_.IsSystemGenerated=data.IsSystemGenerated;
    data_.UserId=data.UserId;
    data_.UpdatedBy=data.UpdatedBy;
    this.popup.show(EmailReplyComponent , {emailTransactionInput:data_});
  }

  ngOnDestroy(): void {
    if (this.listSubscription)
      this.listSubscription.unsubscribe();
    super.destroy();
  }
}

