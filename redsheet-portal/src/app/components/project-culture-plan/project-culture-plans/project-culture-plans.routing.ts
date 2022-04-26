import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_CULTURE_PLANS_ROUTES: Routes = [
	{
	//path: ':projectCulturePlanId', 
	path:'',
	loadChildren: './edit/project-culture-plan-edit.module#ProjectCulturePlanEditModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 33, applicationModuleId: 5094, accessItem: 'edit', keyName: 'projectCulturePlanId' }
	},
];

export const PROJECT_CULTURE_PLANS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_CULTURE_PLANS_ROUTES);
