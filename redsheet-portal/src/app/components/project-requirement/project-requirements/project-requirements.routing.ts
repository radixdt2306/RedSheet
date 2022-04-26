import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_REQUIREMENTS_ROUTES: Routes = [
	{
		path: ':requirementCategoryId/:projectRequirementId', 
	loadChildren: './edit/project-requirement-edit.module#ProjectRequirementEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5092, accessItem: 'edit', keyName: 'projectRequirementId' }
	},
	{
		path: ':ourRequirementId/:requirementCategoryId/:projectRequirementId', 
	loadChildren: './edit/project-requirement-edit.module#ProjectRequirementEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5092, accessItem: 'edit', keyName: 'projectRequirementId' }
	},
	
];

export const PROJECT_REQUIREMENTS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_REQUIREMENTS_ROUTES);
