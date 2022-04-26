import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";
import { REQUEST_METHOD_LIST } from "app/domain/const";

const EXCEPTION_LOG_ROUTES: Routes = [
    {
        path: '',
        loadChildren: './list/exception-log-list.module#ExceptionLogListModule',
        canActivate: [PageAccess],
        data: { rootModuleId: 25, applicationModuleId: 27, accessItem: REQUEST_METHOD_LIST, keyName: 'applicationExceptionLogId' }
    },
];

export const EXCEPTION_LOG_ROUTING: ModuleWithProviders = RouterModule.forChild(EXCEPTION_LOG_ROUTES);
