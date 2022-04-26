import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";
import { REQUEST_METHOD_LIST } from "app/domain/const";

const REQUEST_LOG_ROUTES: Routes = [
	{
    path: '', 
	loadChildren: './list/request-log-list.module#RequestLogListModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 25, applicationModuleId: 26, accessItem: REQUEST_METHOD_LIST, keyName: 'requestLogId' }
	},
];

export const REQUEST_LOG_ROUTING: ModuleWithProviders = RouterModule.forChild(REQUEST_LOG_ROUTES);
