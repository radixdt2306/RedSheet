import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const PROJECT_GAME_ROUTES: Routes = [
    {
        path: 'project-game-details',
        loadChildren: './project-game-details/project-game-details.module#ProjectGameDetailsModule'
    },
//route paths
];

export const PROJECT_GAME_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_GAME_ROUTES);
