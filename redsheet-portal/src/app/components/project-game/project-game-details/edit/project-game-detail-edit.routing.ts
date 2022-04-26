import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { ProjectGameDetailEditComponent } from './project-game-detail-edit.component'

const PROJECT_GAME_DETAIL_EDIT_ROUTES: Routes = [{
    path: '', component: ProjectGameDetailEditComponent
}];

export const PROJECT_GAME_DETAIL_EDIT_ROUTING : ModuleWithProviders = RouterModule.forChild(PROJECT_GAME_DETAIL_EDIT_ROUTES);