import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_LEARNING_ROUTES: Routes = [
    {
        path: 'project-outcome-and-learnings',
        loadChildren: './project-outcome-and-learnings/project-outcome-and-learnings.module#ProjectOutcomeAndLearningsModule'
    },
//route paths
];

export const PROJECT_LEARNING_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_LEARNING_ROUTES);
