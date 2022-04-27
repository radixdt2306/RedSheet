import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { REQUEST_METHOD_EDIT, REQUEST_METHOD_ADD, REQUEST_METHOD_LIST } from "app/domain/const";
import { PageAccess } from "app/domain/authorization";

const USERS_ROUTES: Routes = [{
    path: '', loadChildren: './list/users-list.module#UsersListModule',
    canActivate: [PageAccess], data: { applicationModuleId: 30, accessItem: REQUEST_METHOD_LIST, rootModuleId: 29 }
},
    {
        path: 'add', loadChildren: './add/users-add.module#UsersAddModule',
        canActivate: [PageAccess], data: { applicationModuleId: 30, accessItem: REQUEST_METHOD_ADD, rootModuleId: 29 }
    },
    {
        path: ':userId',
        loadChildren: './edit/users-edit.module#UsersEditModule',
        canActivate: [PageAccess], data: { applicationModuleId: 30, accessItem: REQUEST_METHOD_EDIT, rootModuleId: 29 }
    },
];

export const USERS_ROUTING: ModuleWithProviders = RouterModule.forChild(USERS_ROUTES);