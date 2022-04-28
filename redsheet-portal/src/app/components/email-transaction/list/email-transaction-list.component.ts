import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import {RxToast, RxDialog, DialogClick } from '@rx/view';

import {  EmailTransaction} from 'app/database-models/email-transaction';
import { EmailTransactionService } from 'app/components/email-transaction/email-transaction.service';
import { EmailTransactionDomain } from 'app/components/email-transaction/domain/email-transaction.domain';



@Component({
  templateUrl: './email-transaction-list.component.html',
  })
export class EmailTransactionListComponent extends EmailTransactionDomain implements OnInit, OnDestroy {
  showComponent: boolean = false;
   emailTransaction: EmailTransaction[];
    listSubscription: Subscription;

    constructor(
      private emailTransactionService: EmailTransactionService,    
      private dialog: RxDialog,
  private router: Router,
  ) { super();}

  ngOnInit(): void {
    if (this.listSubscription)
        this.listSubscription.unsubscribe();
    this.listSubscription = this.emailTransactionService.search({Query: []}).subscribe(emailTransaction => {
        this.emailTransaction = emailTransaction.result;
        this.showComponent = true;
    });
  }
 ngOnDestroy(): void {
      if (this.listSubscription)
          this.listSubscription.unsubscribe();
      super.destroy();
  }
}

