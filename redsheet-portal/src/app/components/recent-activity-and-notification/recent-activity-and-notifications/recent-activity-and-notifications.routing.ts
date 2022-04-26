import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { PageAccess } from "app/domain/authorization";

const RECENT_ACTIVITY_AND_NOTIFICATIONS_ROUTES: Routes = [
	{
    path: '', 
	loadChildren: './list/recent-activity-and-notification-list.module#RecentActivityAndNotificationListModule',
	canActivate: [PageAccess],
    data: { rootModuleId: 33, applicationModuleId: 6149, accessItem: 'list', keyName: 'recentActivityAndNotificationId' }
	},
];

export const RECENT_ACTIVITY_AND_NOTIFICATIONS_ROUTING: ModuleWithProviders = RouterModule.forChild(RECENT_ACTIVITY_AND_NOTIFICATIONS_ROUTES);
