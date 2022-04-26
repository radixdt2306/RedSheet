import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectBackgroundEditComponent } from './project-background-edit.component'

const PROJECT_BACKGROUND_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectBackgroundEditComponent
}];

export const PROJECT_BACKGROUND_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_BACKGROUND_EDIT_ROUTES);