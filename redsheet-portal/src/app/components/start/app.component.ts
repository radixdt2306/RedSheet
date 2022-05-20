import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Observable, Subscription } from 'rxjs/Rx';

import { ApplicationConfiguration, ApplicationBroadcaster } from "@rx/core";
import { RxStorage } from "@rx/storage"
import { RxPopup } from "@rx/view" 
import { ValidationFailedComponent, UnAuthorizedAccessComponent } from "@rx/view";
import { SHOW_SIDE_BAR_BUTTON, SHOW_SIDE_BAR } from 'app/const';
import { Notification } from './../../domain/notification-broadcaster'
import { OrientationVideoComponent } from '../shared/top-bar/modal/orientation-video.component';

import { IdleSessionTimerComponent } from '../idle-session-timer/idle-session-timer.component'
import { IdleSessionTimerService } from '../idle-session-timer/idle-session-timer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    entryComponents: [ValidationFailedComponent, UnAuthorizedAccessComponent, OrientationVideoComponent , IdleSessionTimerComponent ]
})
export class AppComponent implements OnInit {
    isShowDashboard: boolean = false;
    showElement: boolean = false;
    timeOutId: number;
    showComponent: boolean = false;
    isSideBarActive: boolean = false;
    configurationSubscription: Subscription;
    loginSubscription: Subscription;
    isShowSideBarButton: boolean;
    isSideBarActiveClass: boolean;

    constructor(
        private router: Router,
        private storage: RxStorage,
        private popup:RxPopup,
        private idleSessionTimer : IdleSessionTimerService,
        applicationBroadCaster: ApplicationBroadcaster
    ) {
        applicationBroadCaster.loginSubscriber.subscribe(t => {
            this.loginClicked(t)
        });

        applicationBroadCaster.allTypeSubscriber.subscribe(t => {
            if (t) {
                switch (t.action) {
                    case SHOW_SIDE_BAR_BUTTON.action:
                        this.isSideBarActiveClass = !t.value;
                        break;
                    case SHOW_SIDE_BAR.action:
                        this.showSideBar(t.value);
                        break;
                }
            }
        })
        this.configurationSubscription = applicationBroadCaster.configurationSubscriber.subscribe(t => {
            this.configurationSubscription.unsubscribe();
        });
    }

    ngOnInit(): void {
        Notification.init();
        var auth = this.storage.local.get("auth");
        if (auth) {
            this.isShowDashboard = true;
            this.showElement = true;
            // this.idleSessionTimer.StartTimer();
        }
    }

    showSideBar(value: boolean) {
        this.isSideBarActive = value;
        this.isShowSideBarButton = value;
        this.isSideBarActiveClass = value;
    }

    loginClicked(isClicked: boolean): void {
        window.setTimeout(() => {
            if (isClicked) {
                this.isShowDashboard = isClicked;
                this.showElement = isClicked;
                // this.router.navigate(['dashboard']);
                location.href = "/dashboard";
            }
        }, 50)
    }

}
