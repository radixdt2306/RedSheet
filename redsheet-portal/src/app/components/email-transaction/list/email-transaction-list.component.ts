import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxToast, RxDialog, DialogClick } from '@rx/view';
import { RxStorage } from '@rx/storage';
import { EmailTransaction } from 'app/database-models/email-transaction';
import { EmailTransactionService } from 'app/components/email-transaction/email-transaction.service';
import { EmailTransactionDomain } from 'app/components/email-transaction/domain/email-transaction.domain';



@Component({
  templateUrl: './email-transaction-list.component.html',
})
export class EmailTransactionListComponent extends EmailTransactionDomain implements OnInit, OnDestroy {
  showComponent: boolean = false;
  emailTransaction: EmailTransaction[];
  listSubscription: Subscription;
  searchValue: string = "";
  emailCategory: any[] = ["SENT", "RECIEVED"];
  emailCategoryValue: string = "";
  dateOrder: string = "DESCENDING";
  data:any;
  searchFilter = { userId:0 , userEmail:"", searchValue: this.searchValue, dateOrder: this.dateOrder, emailCategory: this.emailCategoryValue }

  isSearchEnable: boolean;

  constructor(
    private emailTransactionService: EmailTransactionService,
    private dialog: RxDialog,
    private storage: RxStorage,
  ) { super(); }

  ngOnInit(): void {
    this.isSearchEnable = true;
    this.data = this.storage.local.get('data');
    console.log(this.data.userId);
    console.log(this.data.userName);
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
    console.log(this.emailTransaction);

    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }

    this.listSubscription = this.emailTransactionService.search({ Query: [this.searchFilter] }).subscribe(emailTransaction => {
      this.emailTransaction = null;
      this.emailTransaction = (!emailTransaction.result) ? [] : emailTransaction.result;
      console.log("added", emailTransaction.result);
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

  ngOnDestroy(): void {
    if (this.listSubscription)
      this.listSubscription.unsubscribe();
    super.destroy();
  }
}

