import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_NEGOTIONALITY_ROUTES: Routes = [
    {
        path: 'project-negotionalities',
        loadChildren: './project-negotionalities/project-negotionalities.module#ProjectNegotionalitiesModule'
    },
//route paths
];

export const PROJECT_NEGOTIONALITY_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_NEGOTIONALITY_ROUTES);
