import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import {UserProfileComponent } from './user-profile.component';

const USER_PROFILE_ROUTES: Routes = [{
    path: '', component: UserProfileComponent
}];

export const USER_PROFILE_ROUTING : ModuleWithProviders = RouterModule.forChild(USER_PROFILE_ROUTES);
