import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_GAME_DETAILS_ROUTES: Routes = [
	{
    path: ':projectGameDetailId', 
	loadChildren: './edit/project-game-detail-edit.module#ProjectGameDetailEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5091, accessItem: 'edit', keyName: 'projectGameDetailId' }
	},
];

export const PROJECT_GAME_DETAILS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_GAME_DETAILS_ROUTES);
