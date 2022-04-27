import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxFormsModule} from "@rx/forms";
import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { RecentActivityAndNotificationListComponent } from './recent-activity-and-notification-list.component'
import { RECENT_ACTIVITY_AND_NOTIFICATION_LIST_ROUTING } from './recent-activity-and-notification-list.routing'
import {RecentActivityAndNotificationsService } from "../recent-activity-and-notifications.service";
import { AppDirectiveModule } from 'app/components/shared/directives/app.directive.module';

@NgModule({
    imports: [
        RECENT_ACTIVITY_AND_NOTIFICATION_LIST_ROUTING ,
        CommonModule, RxViewModule, RxTableModule, RxFormsModule, FormsModule, ReactiveFormsModule,AppDirectiveModule
		    ],
    declarations: [RecentActivityAndNotificationListComponent ],
    exports: [RouterModule],
    providers: [RecentActivityAndNotificationsService]
})
export class RecentActivityAndNotificationListModule { }