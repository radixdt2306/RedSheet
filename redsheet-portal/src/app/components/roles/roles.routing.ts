import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";
import { REQUEST_METHOD_ADD, REQUEST_METHOD_LIST, REQUEST_METHOD_EDIT } from "app/domain/const";

const ROLES_ROUTES: Routes = [{
    path: '', loadChildren: './list/roles-list.module#RolesListModule',
    canActivate: [PageAccess], data: { applicationModuleId: 23, accessItem: REQUEST_METHOD_LIST, rootModuleId: 16 }
},
    {
        path: 'add',
        loadChildren: './add/roles-add.module#RolesAddModule',
        canActivate: [PageAccess], data: { applicationModuleId: 23, accessItem: REQUEST_METHOD_ADD, rootModuleId: 16 }
    },
    {
        path: ':roleId',
        loadChildren: './edit/roles-edit.module#RolesEditModule',
        canActivate: [PageAccess], data: { applicationModuleId: 23, accessItem: REQUEST_METHOD_EDIT, rootModuleId: 16 }
    },
];

export const ROLES_ROUTING: ModuleWithProviders = RouterModule.forChild(ROLES_ROUTES);