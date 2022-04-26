import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_CULTURE_ROUTES: Routes = [
    {
        path: 'project-cultures',
        loadChildren: './project-cultures/project-cultures.module#ProjectCulturesModule'
    },
//route paths
];

export const PROJECT_CULTURE_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_CULTURE_ROUTES);
