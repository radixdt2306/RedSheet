import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_NEGOTIATIONS_ROUTES: Routes = [
	{
    path: ':projectNegotiationId', 
	loadChildren: './edit/project-negotiation-edit.module#ProjectNegotiationEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5089, accessItem: 'edit', keyName: 'projectNegotiationId' }
	},
];

export const PROJECT_NEGOTIATIONS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_NEGOTIATIONS_ROUTES);
