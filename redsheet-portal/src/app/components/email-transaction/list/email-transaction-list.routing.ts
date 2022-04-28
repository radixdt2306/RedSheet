import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';


import { EmailTransactionListComponent } from './email-transaction-list.component'

const EMAIL_TRANSACTION_LIST_ROUTES: Routes = [{
    path: '', component: EmailTransactionListComponent
}];

export const EMAIL_TRANSACTION_LIST_ROUTING : ModuleWithProviders = RouterModule.forChild(EMAIL_TRANSACTION_LIST_ROUTES);