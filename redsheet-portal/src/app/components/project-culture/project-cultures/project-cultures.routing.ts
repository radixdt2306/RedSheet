import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_CULTURES_ROUTES: Routes = [
	{
    path: ':projectCultureId', 
	loadChildren: './edit/project-culture-edit.module#ProjectCultureEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 5086, accessItem: 'edit', keyName: 'projectCultureId' }
	},
];

export const PROJECT_CULTURES_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_CULTURES_ROUTES);
