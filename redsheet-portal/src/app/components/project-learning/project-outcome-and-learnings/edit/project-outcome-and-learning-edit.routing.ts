import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectOutcomeAndLearningEditComponent } from './project-outcome-and-learning-edit.component'

const PROJECT_OUTCOME_AND_LEARNING_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectOutcomeAndLearningEditComponent
}];

export const PROJECT_OUTCOME_AND_LEARNING_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_OUTCOME_AND_LEARNING_EDIT_ROUTES);