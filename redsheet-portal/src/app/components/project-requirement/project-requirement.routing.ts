import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_REQUIREMENT_ROUTES: Routes = [
    {
        path: 'project-requirements',
        loadChildren: './project-requirements/project-requirements.module#ProjectRequirementsModule'
    },
//route paths
];

export const PROJECT_REQUIREMENT_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_REQUIREMENT_ROUTES);
