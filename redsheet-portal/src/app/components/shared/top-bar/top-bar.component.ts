import { Component, OnChanges, SimpleChanges, OnInit, Inject, ComponentFactoryResolver, Injectable } from '@angular/core';

import { ApplicationConfiguration, ApplicationPage, ApplicationBroadcaster } from "@rx/core";
import { Language } from "../../../models"
import { ApplicationService } from '../../../domain/authorization/app.service';
import { user } from "@rx/security";
import { UserAuthorizationService } from "app/domain/authorization";
import { RxStorage } from "@rx/storage";
import { Router } from "@angular/router";
import { RecentActivityAndNotification } from 'app/database-models';
import { RxToast } from '@rx/view/views';
import { IS_MODULE_LOCK } from 'app/const';
import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi } from "@rx/security";

import { RxSpinner, RxDialog, DialogClick, RxPopup } from "@rx/view";
import { Notification } from '../../../domain/notification-broadcaster';
import { API_HOST_URI } from "@rx";
import { OrientationVideoComponent } from './modal/orientation-video.component';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
})

export class TopBarComponent implements OnInit { //Changes By Ishani Put OnInit
    languages: Language[];
    isOpened: boolean = false;
    defaultLanguage: string;
    loggedInName: string;
    isOpenUserProfile: boolean;
    isNotification: boolean = false;
    isDropdownOpened: boolean = false;
    notifications: any;
    notificationCount: number = 0;
    showAcademyLink: boolean = false;
    academyLink: string;
    http: RxHttp;
    
    constructor(@Inject(RxSpinner) private spinner: RxSpinner,
        private storage: RxStorage,
        private toast: RxToast,
        private applicationService: ApplicationService,
        private applicationBroadcaster: ApplicationBroadcaster,
        private userAuthorizationService: UserAuthorizationService,
        @Inject(API_HOST_URI) private hostUri: string,
        private router: Router,
        private dialog: RxDialog,
        private popup: RxPopup,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.applicationBroadcaster.configurationSubscriber.subscribe(t => {
            this.languages = ApplicationConfiguration.get("languages");
            this.languages = this.languages.where(t => t.active == true);
            this.defaultLanguage = ApplicationConfiguration.getDefaultLanguage();
            this.popup.setComponent(componentFactoryResolver);
        });

        this.loggedInName = user.data['fullName'];
        Notification.notificationSubscriber.subscribe(t => {
            this.applicationService.get().subscribe(s => {
                this.notifications = s.result;
                if (s.result != undefined) {
                    this.notificationCount = s.result.length;
                }
                else {
                    this.notificationCount = 0;
                }
                // this.notificationCount = s.result.length;

            }, error => {

            });
        });
    }

    bindClick(this: Document, ev: MouseEvent): void {
        var targetElement = <any>ev.target;
        if (targetElement.id != 'dropdownMenuLink' && targetElement.id != 'bell' && targetElement.id != 'notificationCount') {
            var tt = this.documentElement.getElementsByClassName('dropdown-menu pt-0 pb-2 show');
            if (tt.length > 0)
                tt[0].className = 'dropdown-menu pt-0 pb-2';
            var ttHide = this.documentElement.getElementsByClassName('list-inline-item dropdown position-static show');
            if (ttHide.length > 0)
                ttHide[0].className = 'list-inline-item dropdown position-static';
        }
    }

    ngOnInit(): void {
        //Changes By Ishani
        document.onclick = this.bindClick;
        this.languages = ApplicationConfiguration.get("languages");
        if (this.languages != undefined) {
            this.languages = this.languages.where(t => t.active == true);
            this.defaultLanguage = ApplicationConfiguration.getDefaultLanguage();
        }
        this.applicationService.get().subscribe(s => {
            this.notifications = s.result;
            if (s.result != undefined) {
                this.notificationCount = s.result.length;
            }
            else {
                this.notificationCount = 0;
            }
        }, error => {
        });

        //Changes By Ishani

        function getCookie(name) {
            // get cookie name and value
            let decodedCookie = decodeURIComponent(document.cookie);
            let cookieArray = decodedCookie.split(';');
            //console.log(cookieArray);
            var match = false;
            var obj = {};
        
            for (var i = 0; i < cookieArray.length; i++) {
                let curCookieArray = cookieArray[i].split('=');
                let curCookieName = curCookieArray[0];
                let curCookieVal = curCookieArray[1];
                if (curCookieName.trim() === name) {
                    match = true;
                    obj = { name: curCookieName, value: curCookieVal };
                }
            }
            return match === false ? false : obj;
        }
        
        if (getCookie('academyUrl') != false && getCookie('academyUrl')["value"] != 'null') {
            console.log(getCookie('academyUrl')["value"]);
            this.showAcademyLink = true;
            this.academyLink = getCookie('academyUrl')["value"];
        }
        
        // if (this.storage.session.get('academyLink') != undefined){
        //     this.showAcademyLink = true;
        //     this.academyLink = this.storage.session.get('academyLink');
        // }
       
    }

    checkNotification(isNotification): void {
        this.isNotification = !isNotification;
        this.applicationService.get().subscribe(s => {
            this.notifications = s.result;
            // this.notificationCount = s.result.length;
        }, error => {

        });
    }
    
    getIconClass(TemplateModuleId): string {
        let iconClass: string;
        switch (TemplateModuleId) {
            case 38:
                iconClass = "redsheet redsheet-background  text-muted fa-2x mr-3";
                break;
            case 39:
                iconClass = "fa fa-users  text-muted fa-2x mr-3";
                break;
            case 40:
                iconClass = "redsheet redsheet-culture text-muted fa-2x mr-3";
                break;
            case 41:
                iconClass = "redsheet redsheet-negotionality text-muted fa-2x mr-3";
                break;
            case 42:
                iconClass = "redsheet redsheet-this-negotiation text-muted fa-2x mr-3";
                break;
            case 43:
                iconClass = "redsheet redsheet-power text-muted fa-2x mr-3";
                break;
            case 44:
                iconClass = "redsheet redsheet-game text-muted fa-2x mr-3";
                break;
            case 45:
                iconClass = "redsheet redsheet-requirement text-muted fa-2x mr-3";
                break;
            case 46:
                iconClass = "redsheet redsheet-their-requirement text-muted fa-2x mr-3";
                break;
            // case 47:
            //     iconClass = "redsheet redsheet-requirement text-muted fa-2x mr-3";
            //     break;
            case 47:
                iconClass = "redsheet redsheet-culture-plan text-muted fa-2x mr-3";
                break;
            case 48:
                iconClass = "redsheet redsheet-preparation text-muted fa-2x mr-3";
                break;
            case 49:
                iconClass = "redsheet redsheet-event-timeline text-muted fa-2x mr-3";
                break;
            case 50:
                iconClass = "redsheet redsheet-post-event-action text-muted fa-2x mr-3";
                break;
            case 51:
                iconClass = "redsheet redsheet-outcomes-and-learning text-muted fa-2x mr-3";
                break;
            case 52:
                iconClass = "redsheet redsheet-background text-muted fa-2x mr-3";
                break;
            case 53:
                iconClass = "redsheet redsheet-meeting-management text-muted fa-2x mr-3";
                break;
            case 54:
                iconClass = "redsheet redsheet-this-negotiation text-muted fa-2x mr-3";
                break;
            case 55:
                iconClass = "redsheet redsheet-meeting-management text-muted fa-2x mr-3";
                break;
            default:
                iconClass = "";
        }
        return iconClass;

    }

    changeLanguage(language: Language): void {
        if (language.languageName != this.defaultLanguage) {
            var languageName = language.languageName;
            this.applicationService.getConfiguration(languageName).subscribe(t => {
                ApplicationConfiguration.set(t);
                var applicationModuleId = ApplicationPage.get("applicationModuleId");
                this.applicationService.getModuleContents(languageName, ApplicationPage.get("action"), applicationModuleId).subscribe(moduleContents => {
                    ApplicationConfiguration.setDefaultLanguage(languageName);
                    this.defaultLanguage = languageName;
                    ApplicationPage.addOrUpdateModuleContent(applicationModuleId, moduleContents);
                    ApplicationConfiguration.setLanguages(this.languages);
                    //this.applicationBroadcaster.configurationBroadCast(true);
                })
            });
        }
    }

    getSymbol(TemplateModuleId): string {
        let iconClass: string;
        if (TemplateModuleId == 41 || TemplateModuleId == 45 || TemplateModuleId == 46) {
            return iconClass = "sup color-blue-gray fa fa-registered";
        }
        else {
            return iconClass = "";
        }

    }

    openUserProfile(): void {
        this.isOpenUserProfile = !this.isOpenUserProfile
    }

    userProfile(): void {
        this.isOpenUserProfile = !this.isOpenUserProfile
        this.router.navigate(['user-profile']);
    }

    notificationSeen(notification: any): void {

        this.applicationService.getNotifications(notification.RecentActivityAndNotificationId).subscribe(s => {
            this.notificationCount = this.notificationCount - 1;
            this.isNotification = true;
            var projectModuleId = s;
            this.applicationBroadcaster.allTypeBroadCast({ action: IS_MODULE_LOCK.action, value: s });

            this.router.navigate([notification.URL]);

        }, error => {
            this.toast.show(error, { status: 'error' });

        });
    }

    logOut(): void {
        this.isOpenUserProfile = !this.isOpenUserProfile
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
    }

    showLanguages(): void {
        this.isOpened = !this.isOpened;
    }

    onUserGuide() {
        this.spinner.show();

        window.location.href = this.hostUri + 'api/applicationconfigurations/UserGuide';

        window.setTimeout(() => {
            this.spinner.hide();
        }, 3000);
    }

    onOrientationVideo() {
        document.body.className = "modal-open";
        this.popup.show(OrientationVideoComponent)
            .then(t => this.ngOnInit());
    }

    dropdownForHD_OV_UG(isDropdownOpened: boolean): void {
        this.isDropdownOpened = !isDropdownOpened;
    }
}
