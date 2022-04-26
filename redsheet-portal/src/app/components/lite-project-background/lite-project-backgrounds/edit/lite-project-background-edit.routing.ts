import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { LiteProjectBackgroundEditComponent } from './lite-project-background-edit.component'

const LITE_PROJECT_BACKGROUND_EDIT_ROUTES: Routes = [{
    path: '', component: LiteProjectBackgroundEditComponent
}];

export const LITE_PROJECT_BACKGROUND_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(LITE_PROJECT_BACKGROUND_EDIT_ROUTES);