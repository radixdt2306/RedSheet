import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Observable, Subscription } from 'rxjs/Rx';

import { ApplicationConfiguration, ApplicationBroadcaster } from "@rx/core";
import { RxStorage } from "@rx/storage"
import { ValidationFailedComponent, UnAuthorizedAccessComponent } from "@rx/view";
import { SHOW_SIDE_BAR_BUTTON, SHOW_SIDE_BAR } from 'app/const';
import { Notification } from './../../domain/notification-broadcaster'
import { OrientationVideoComponent } from '../shared/top-bar/modal/orientation-video.component';
import { timer } from 'rxjs/observable/timer';
import { UserAuthorizationService } from 'app/domain/authorization';

import * as $ from '../../../assets/js/jquery.min.js';
import * as bootstrap from '../../../assets/js/bootstrap.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    entryComponents: [ValidationFailedComponent, UnAuthorizedAccessComponent, OrientationVideoComponent]
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

    //variables for idle sessiontime
    CheckForIdle:boolean=false;
    count:number=0
    private timer:Observable<number>;
    SessionTime:number = 30;
    SessionExpireAfter:number = 15;
    private timerSubscription: Subscription = new Subscription;
    sessionmodalelement:any;
    modal:any;
    //
    constructor(
        private router: Router,
        private storage: RxStorage,
        private userAuthorizationService:UserAuthorizationService,
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
            this.sessionmodalelement = document.querySelector('#SessionModal');
            this.modal = new bootstrap.Modal(this.sessionmodalelement,{backdrop:'static',focus:true});
            this.StartTimer();
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
  
    StartTimer()
    {
      this.CheckForIdle = true;
      this.StopTimer();
      this.timer = timer(0,1000);
      this.timerSubscription = this.timer.subscribe(
        res => {
          if(res as number)
          {
            $(document).mousemove((ev)=>{if(this.CheckForIdle == true){this.ExpandSession();}})
            $(document).keydown((ev)=>{if(this.CheckForIdle == true){this.ExpandSession();}})

            this.SessionTime = this.SessionTime-1;
            if(res > this.SessionExpireAfter)
            {
              this.CheckForIdle = false;
              this.modal.show();
            }
            if(this.SessionTime == 0)
            {
              this.logOut();
            }
          }
        }
      )
    }
  
    StopTimer()
    {
        this.timerSubscription.unsubscribe();
        this.timer = new Observable<number>();
    }
  
    ExpandSession()
    {
      this.SessionTime = 30;
      this.modal.hide();
      this.StartTimer();
      
    }
  
    CloseTimer()
    {
      this.StopTimer();
      console.log("logout");
      this.modal.hide();
    }
    logOut(): void {
      // this.isOpenUserProfile = !this.isOpenUserProfile
      this.userAuthorizationService.postLogOut().subscribe(t => {
          this.storage.local.clearAll();
          document.cookie = "academyUrl=; samesite=Lax;";
          window.location.href = '/login';
      }, error => {
          this.storage.local.clearAll();
          document.cookie = "academyUrl=; samesite=Lax;";
          window.location.href = '/login';
      })
      console.log("DELETE COOKIE");
      this.CloseTimer();
      // ldle timer close
  }
    //

}
