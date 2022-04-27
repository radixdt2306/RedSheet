import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";
import { REQUEST_METHOD_FULL } from "app/domain/const";

const LOGIN_ROUTES: Routes = [
    {
        path: '',
        loadChildren: './login/login.module#LoginModule',
        canActivate: [PageAccess],
        data: { rootModuleId: 1, applicationModuleId: 33, accessItem: REQUEST_METHOD_FULL, keyName: 'userId' }
    },
];

export const LOGIN_ROUTING: ModuleWithProviders = RouterModule.forChild(LOGIN_ROUTES);
