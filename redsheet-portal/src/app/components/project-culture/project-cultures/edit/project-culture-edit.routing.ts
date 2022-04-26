import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectCultureEditComponent } from './project-culture-edit.component'

const PROJECT_CULTURE_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectCultureEditComponent
}];

export const PROJECT_CULTURE_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_CULTURE_EDIT_ROUTES);