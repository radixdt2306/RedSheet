import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxFormsModule} from "@rx/forms";
import {RxViewModule} from "@rx/view";
import {RxTableModule} from "@rx/table";

import { EmailTransactionListComponent } from './email-transaction-list.component'
import { EMAIL_TRANSACTION_LIST_ROUTING } from './email-transaction-list.routing'
import {EmailTransactionService } from "app/components/email-transaction/email-transaction.service";
import { AppDirectiveModule } from 'app/components/shared/directives/app.directive.module';
import { EmailReplyModule } from '../email-reply/email-reply/email-reply.module';

@NgModule({
    imports: [
        EMAIL_TRANSACTION_LIST_ROUTING ,
        CommonModule, RxViewModule, RxTableModule, RxFormsModule, FormsModule, ReactiveFormsModule,AppDirectiveModule,EmailReplyModule
		    ],
    declarations: [EmailTransactionListComponent],
    exports: [RouterModule],
    providers: [EmailTransactionService],
})
export class EmailTransactionListModule { }