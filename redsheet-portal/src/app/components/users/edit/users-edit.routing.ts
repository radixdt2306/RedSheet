import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import {UsersEditComponent } from './users-edit.component';

const USERS_EDIT_ROUTES: Routes = [{
    path: '', component: UsersEditComponent
}];

export const USERS_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(USERS_EDIT_ROUTES);
