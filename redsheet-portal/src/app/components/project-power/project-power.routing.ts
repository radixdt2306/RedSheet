import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_POWER_ROUTES: Routes = [
    {
        path: 'project-powers',
        loadChildren: './project-powers/project-powers.module#ProjectPowersModule'
    },
//route paths
];

export const PROJECT_POWER_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_POWER_ROUTES);
