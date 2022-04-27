import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectCulturePlanEditComponent } from './project-culture-plan-edit.component'

const PROJECT_CULTURE_PLAN_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectCulturePlanEditComponent
}];

export const PROJECT_CULTURE_PLAN_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_CULTURE_PLAN_EDIT_ROUTES);