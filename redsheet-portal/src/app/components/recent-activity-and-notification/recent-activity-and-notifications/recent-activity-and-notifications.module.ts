import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { RECENT_ACTIVITY_AND_NOTIFICATIONS_ROUTING } from './recent-activity-and-notifications.routing';
import { RecentActivityAndNotificationsService } from './recent-activity-and-notifications.service';

@NgModule({
    imports: [RECENT_ACTIVITY_AND_NOTIFICATIONS_ROUTING],
    exports: [RouterModule],
    providers: [RecentActivityAndNotificationsService]
})
export class RecentActivityAndNotificationsModule { }