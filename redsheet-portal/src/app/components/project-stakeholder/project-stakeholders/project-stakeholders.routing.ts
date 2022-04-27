import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const PROJECT_STAKEHOLDERS_ROUTES: Routes = [
	{
    path: '', 
	loadChildren: './list/project-stakeholder-list.module#ProjectStakeholderListModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 33, applicationModuleId: 5085, accessItem: 'list', keyName: 'projectStakeholderId' }
	},
];

export const PROJECT_STAKEHOLDERS_ROUTING: ModuleWithProviders = RouterModule.forChild(PROJECT_STAKEHOLDERS_ROUTES);
