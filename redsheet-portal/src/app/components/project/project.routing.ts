import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_ROUTES: Routes = [
    {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsModule'
    },
//route paths
];

export const PROJECT_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_ROUTES);
