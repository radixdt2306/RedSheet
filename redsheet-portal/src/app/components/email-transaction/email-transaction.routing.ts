import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";

const EMAIL_TRANSACTION_ROUTES: Routes = [
	{
    path: '',
    loadChildren: 'app/components/email-transaction/list/email-transaction-list.module#EmailTransactionListModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 33, applicationModuleId: 6149, accessItem: 'list', keyName: 'emailTransactionId' }
	},
];

export const EMAIL_TRANSACTION_ROUTING: ModuleWithProviders = RouterModule.forChild(EMAIL_TRANSACTION_ROUTES);
