import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { EMAIL_TRANSACTION_ROUTING } from './email-transaction.routing';
import { EmailTransactionService } from './email-transaction.service';
import { EmailTransactionListModule } from './list/email-transaction-list.module';

@NgModule({
    imports: [EMAIL_TRANSACTION_ROUTING,EmailTransactionListModule],
    exports: [RouterModule],
    providers: [EmailTransactionService],
    declarations: []
})
export class EmailTransactionModule { }