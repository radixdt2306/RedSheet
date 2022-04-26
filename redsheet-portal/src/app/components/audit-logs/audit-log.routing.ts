import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";
import { REQUEST_METHOD_LIST } from "app/domain/const";

const AUDIT_LOG_ROUTES: Routes = [
	{
    path: '', 
	loadChildren: './list/audit-log-list.module#AuditLogListModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 25, applicationModuleId: 28, accessItem: REQUEST_METHOD_LIST, keyName: 'auditRecordId' }
	},
];

export const AUDIT_LOG_ROUTING: ModuleWithProviders = RouterModule.forChild(AUDIT_LOG_ROUTES);
