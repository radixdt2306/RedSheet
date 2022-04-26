import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick } from '@rx/view';

import { RecentActivityAndNotification } from 'app/database-models';
import { RecentActivityAndNotificationsService } from '../recent-activity-and-notifications.service';
import { RecentActivityAndNotificationDomain } from '../domain/recent-activity-and-notification.domain';


@Component({
    templateUrl: './recent-activity-and-notification-list.component.html',
})
export class RecentActivityAndNotificationListComponent extends RecentActivityAndNotificationDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    recentActivityAndNotifications: RecentActivityAndNotification[];
    listSubscription: Subscription;


    constructor(
        private recentActivityAndNotificationsService: RecentActivityAndNotificationsService,    
        private dialog: RxDialog,
		private router: Router,
    ) { super();}

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.recentActivityAndNotificationsService.search({Query: []}).subscribe(recentActivityAndNotifications => {
            this.recentActivityAndNotifications = recentActivityAndNotifications.result;
            this.showComponent = true;
        });
    }



    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
