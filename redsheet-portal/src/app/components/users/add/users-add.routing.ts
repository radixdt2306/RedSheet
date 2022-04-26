import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import {UsersAddComponent } from './users-add.component';

const USERS_ADD_ROUTES: Routes = [{
    path: '', component: UsersAddComponent
}];

export const USERS_ADD_ROUTING : ModuleWithProviders = RouterModule.forChild(USERS_ADD_ROUTES);
