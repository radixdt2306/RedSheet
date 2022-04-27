import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_CULTURE_PLAN_ROUTES: Routes = [
    {
        path: 'project-culture-plans',
        loadChildren: './project-culture-plans/project-culture-plans.module#ProjectCulturePlansModule'
    },
//route paths
];

export const PROJECT_CULTURE_PLAN_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_CULTURE_PLAN_ROUTES);
