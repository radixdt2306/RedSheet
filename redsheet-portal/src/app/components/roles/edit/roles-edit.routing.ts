import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import {RolesEditComponent } from './roles-edit.component';

const ROLES_EDIT_ROUTES: Routes = [{
    path: '', component: RolesEditComponent
}];

export const ROLES_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(ROLES_EDIT_ROUTES);
