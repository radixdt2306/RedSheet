import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Observable, Subscription } from 'rxjs/Rx';

import { ApplicationConfiguration, ApplicationBroadcaster } from "@rx/core";
import { RxStorage } from "@rx/storage"
import { RxPopup } from "@rx/view" 
import { ValidationFailedComponent, UnAuthorizedAccessComponent } from "@rx/view";
import { SHOW_SIDE_BAR_BUTTON, SHOW_SIDE_BAR } from 'app/const';
import { Notification } from './../../domain/notification-broadcaster'
import { OrientationVideoComponent } from '../shared/top-bar/modal/orientation-video.component';

import * as $ from '../../../assets/js/jquery.min.js';


import { timer } from 'rxjs/observable/timer';
import { UserAuthorizationService } from 'app/domain/authorization';

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

    // IDLE SESSION

    CheckForIdle:boolean=false;
    count:number=0
    private timer:Observable<number>;
    _SessionTime:number=60*5;
    SessionTime:number = this._SessionTime;
    SessionExpireAlert:number = 60*5-30;
    SessionExpireAfter:number = this.SessionTime-this.SessionExpireAlert;
    private timerSubscription: Subscription = new Subscription;
    sessionmodalelement:any;
    isSessionEnable:boolean=false;
    modal:any;
    //

    @HostListener('window:scroll', ['$event'])
    onWindowScroll($event) {
        if(this.CheckForIdle == true)
        {
            this.ExpandSession();
        }
    }
    constructor(
        private router: Router,
        private storage: RxStorage,
        private popup:RxPopup,
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
            $(document).dblclick(()=>{if(this.CheckForIdle == true){this.ExpandSession();}})
            $(document).click(()=>{if(this.CheckForIdle == true){this.ExpandSession(); }})
            $(document).contextmenu(()=>{if(this.CheckForIdle == true){this.ExpandSession(); }})
            $(document).mouseover(()=>{if(this.CheckForIdle == true){this.ExpandSession(); }})
            $(document).keydown(()=>{if(this.CheckForIdle == true){this.ExpandSession();}})
            $('body').on(
                "touchmove", ()=>{
                    if(this.CheckForIdle == true)
                    {
                        this.ExpandSession();
                    }
                }
            );
            this.SessionTime = this.SessionTime-1;
            if(res == this.SessionExpireAlert)
            {
              this.CheckForIdle = false;
              this.isSessionEnable=true;
                // this.modal.show();
                $("#session").show();

            }
            if(this.SessionTime == 0)
            {
              this.logOut();

            }
          }
        }
      );
    }
  
    StopTimer()
    {
        this.timerSubscription.unsubscribe();
        this.timer = new Observable<number>();
    }
  
    ExpandSession()
    {
        $("#session").hide();
        this.isSessionEnable=false;
      this.SessionTime = this._SessionTime;
      this.SessionExpireAfter = this.SessionTime-this.SessionExpireAlert;
      
      this.StartTimer();
      
    }
  
    CloseTimer()
    {
      this.StopTimer();
    //   this.modal.hide();
    $("#session").hide();
    this.isSessionEnable=false;
    this.CheckForIdle = false;        
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
      this.CloseTimer();
      // ldle timer close
    }

}
