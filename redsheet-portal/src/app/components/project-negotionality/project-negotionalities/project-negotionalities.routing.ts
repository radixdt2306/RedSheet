import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_NEGOTIONALITIES_ROUTES: Routes = [
	{
    path: ':projectNegotionalityId', 
	loadChildren: './edit/project-negotionality-edit.module#ProjectNegotionalityEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5088, accessItem: 'edit', keyName: 'projectNegotionalityId' }
	},
];

export const PROJECT_NEGOTIONALITIES_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_NEGOTIONALITIES_ROUTES);
