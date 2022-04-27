import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectPreparationEditComponent } from './project-preparation-edit.component'

const PROJECT_PREPARATION_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectPreparationEditComponent
}];

export const PROJECT_PREPARATION_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_PREPARATION_EDIT_ROUTES);