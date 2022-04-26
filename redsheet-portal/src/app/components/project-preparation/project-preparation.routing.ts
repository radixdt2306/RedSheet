import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_PREPARATION_ROUTES: Routes = [
    {
        path: 'project-preparations',
        loadChildren: './project-preparations/project-preparations.module#ProjectPreparationsModule'
    },
//route paths
];

export const PROJECT_PREPARATION_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_PREPARATION_ROUTES);
