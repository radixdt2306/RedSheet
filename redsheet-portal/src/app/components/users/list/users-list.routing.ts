import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import {UsersListComponent } from './users-list.component';

const USERS_LIST_ROUTES: Routes = [{
    path: '', component: UsersListComponent
}];

export const USERS_LIST_ROUTING : ModuleWithProviders = RouterModule.forChild(USERS_LIST_ROUTES);
