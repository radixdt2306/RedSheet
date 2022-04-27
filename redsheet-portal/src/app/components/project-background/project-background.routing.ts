import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_BACKGROUND_ROUTES: Routes = [
    {
        path: 'project-backgrounds',
        loadChildren: './project-backgrounds/project-backgrounds.module#ProjectBackgroundsModule'
    },
//route paths
];

export const PROJECT_BACKGROUND_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_BACKGROUND_ROUTES);
