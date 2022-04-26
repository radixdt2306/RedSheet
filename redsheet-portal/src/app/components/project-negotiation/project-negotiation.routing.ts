import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_NEGOTIATION_ROUTES: Routes = [
    {
        path: 'project-negotiations',
        loadChildren: './project-negotiations/project-negotiations.module#ProjectNegotiationsModule'
    },
//route paths
];

export const PROJECT_NEGOTIATION_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_NEGOTIATION_ROUTES);
