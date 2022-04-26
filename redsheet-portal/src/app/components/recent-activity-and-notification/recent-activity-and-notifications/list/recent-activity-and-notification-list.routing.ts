import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { RecentActivityAndNotificationListComponent } from './recent-activity-and-notification-list.component'

const RECENT_ACTIVITY_AND_NOTIFICATION_LIST_ROUTES: Routes = [{
    path: '', component: RecentActivityAndNotificationListComponent
}];

export const RECENT_ACTIVITY_AND_NOTIFICATION_LIST_ROUTING : ModuleWithProviders = RouterModule.forChild(RECENT_ACTIVITY_AND_NOTIFICATION_LIST_ROUTES);