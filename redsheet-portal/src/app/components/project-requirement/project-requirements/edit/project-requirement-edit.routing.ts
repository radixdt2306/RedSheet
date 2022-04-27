import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectRequirementEditComponent } from './project-requirement-edit.component'

const PROJECT_REQUIREMENT_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectRequirementEditComponent
}];

export const PROJECT_REQUIREMENT_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_REQUIREMENT_EDIT_ROUTES);


