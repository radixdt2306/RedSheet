import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_BACKGROUNDS_ROUTES: Routes = [
	{
    path: ':projectBackgroundId', 
	loadChildren: './edit/project-background-edit.module#ProjectBackgroundEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5084, accessItem: 'edit', keyName: 'projectBackgroundId' }
	},
];

export const PROJECT_BACKGROUNDS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_BACKGROUNDS_ROUTES);
	