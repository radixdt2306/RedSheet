import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { MultilingualListComponent } from './multilingual-list.component';
import { PageAccess } from "app/domain/authorization";
import { REQUEST_METHOD_LIST } from "app/domain/const";

const MULTILINGUAL_LIST_ROUTES: Routes = [{
    path: '', component: MultilingualListComponent,
    canActivate: [PageAccess], data: { applicationModuleId: 20, accessItem: REQUEST_METHOD_LIST, rootModuleId: 16 }
},
];

export const MULTILINGUAL_LIST_ROUTING: ModuleWithProviders = RouterModule.forChild(MULTILINGUAL_LIST_ROUTES);