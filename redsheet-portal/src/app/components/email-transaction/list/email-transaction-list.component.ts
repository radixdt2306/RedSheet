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

  filterOption:any[]=["SENT","RECEIVED"];
  dateOrder:string = "ASCENDING";
  liReapet:any[]=[1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

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
  // date order toggle 
  DateOrder()
  {
    if(this.dateOrder == "ASCENDING")
    {
      this.dateOrder = "DESCENDING";
    }
    else
    {
      this.dateOrder = "ASCENDING";
    }
  }

 ngOnDestroy(): void {
      if (this.listSubscription)
          this.listSubscription.unsubscribe();
      super.destroy();
  }
}

