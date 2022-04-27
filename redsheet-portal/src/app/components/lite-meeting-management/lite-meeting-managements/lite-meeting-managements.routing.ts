import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess, ChangeDetectionGuard } from "app/domain/authorization";

const LITE_MEETING_MANAGEMENTS_ROUTES: Routes = [
	{
    path: ':liteMeetingManagementId', 
	loadChildren: './edit/lite-meeting-management-edit.module#LiteMeetingManagementEditModule',
	canActivate: [PageAccess],canDeactivate:[ChangeDetectionGuard],
    data: { rootModuleId: 33, applicationModuleId: 6140, accessItem: 'edit', keyName: 'liteMeetingManagementId' }
	},
];

export const LITE_MEETING_MANAGEMENTS_ROUTING: ModuleWithProviders = RouterModule.forChild(LITE_MEETING_MANAGEMENTS_ROUTES);
