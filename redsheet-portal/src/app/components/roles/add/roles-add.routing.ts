import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import {RolesAddComponent } from './roles-add.component';

const ROLES_ADD_ROUTES: Routes = [{
    path: '', component: RolesAddComponent
}];

export const ROLES_ADD_ROUTING : ModuleWithProviders = RouterModule.forChild(ROLES_ADD_ROUTES);
