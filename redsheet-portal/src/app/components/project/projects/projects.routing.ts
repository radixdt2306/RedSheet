import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";

const PROJECTS_ROUTES: Routes = [
	{
    path: '', 
	loadChildren: './list/project-list.module#ProjectListModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 33, applicationModuleId: 34, accessItem: 'list', keyName: 'projectId' }
	},
	{
    path: 'add', 
	loadChildren: './add/project-add.module#ProjectAddModule',
	canActivate: [PageAccess],
	data: { rootModuleId: 33, applicationModuleId: 34, accessItem: 'add', keyName: 'projectId' }
	},
	{
    path: ':projectId', 
	loadChildren: './edit/project-edit.module#ProjectEditModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 33, applicationModuleId: 34, accessItem: 'edit', keyName: 'projectId' }
	},
];

export const PROJECTS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECTS_ROUTES);
