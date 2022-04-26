import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_POWERS_ROUTES: Routes = [
	{
    path: ':projectPowerId', 
	loadChildren: './edit/project-power-edit.module#ProjectPowerEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5090, accessItem: 'edit', keyName: 'projectPowerId' }
	},
];

export const PROJECT_POWERS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_POWERS_ROUTES);
