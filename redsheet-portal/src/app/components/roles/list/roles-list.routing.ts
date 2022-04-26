import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import {RolesListComponent } from './roles-list.component';

const ROLES_LIST_ROUTES: Routes = [{
    path: '', component: RolesListComponent
}];

export const ROLES_LIST_ROUTING : ModuleWithProviders = RouterModule.forChild(ROLES_LIST_ROUTES);
