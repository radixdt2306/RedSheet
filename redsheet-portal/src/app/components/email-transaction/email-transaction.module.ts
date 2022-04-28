import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { EMAIL_TRANSACTION_ROUTING } from './email-transaction.routing';
import { EmailTransactionService } from './email-transaction.service';

@NgModule({
    imports: [EMAIL_TRANSACTION_ROUTING],
    exports: [RouterModule],
    providers: [EmailTransactionService]
})
export class EmailTransactionModule { }