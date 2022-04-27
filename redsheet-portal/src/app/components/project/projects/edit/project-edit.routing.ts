import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectEditComponent } from './project-edit.component'

const PROJECT_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectEditComponent
}];

export const PROJECT_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_EDIT_ROUTES);