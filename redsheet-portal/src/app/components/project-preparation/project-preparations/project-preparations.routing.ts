import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_PREPARATIONS_ROUTES: Routes = [
	{
    path: ':projectPreparationId', 
	loadChildren: './edit/project-preparation-edit.module#ProjectPreparationEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5095, accessItem: 'edit', keyName: 'projectPreparationId' }
	},
];

export const PROJECT_PREPARATIONS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_PREPARATIONS_ROUTES);
