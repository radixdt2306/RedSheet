import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";
import { REQUEST_METHOD_LIST } from "app/domain/const";

const MULTILINGUAL_ROUTES: Routes = [
	{
    path: '', 
	loadChildren: './list/multilingual-list.module#MultilingualListModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 16, applicationModuleId: 20, accessItem: REQUEST_METHOD_LIST, keyName: '' }
	},
];

export const MULTILINGUAL_ROUTING: ModuleWithProviders = RouterModule.forChild(MULTILINGUAL_ROUTES);
