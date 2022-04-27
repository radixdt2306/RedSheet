import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from "@angular/router";

import { API_HOST_URI, RxHttp } from '@rx/http';
import { RxValidation, RxFormsModule } from '@rx/forms';
import { RxViewModule, RxViewServiceModule } from '@rx/view';
import { RxStorageModule } from '@rx/storage';
import { RxSecurityModule, PermissionService } from "@rx/security";
import { RxTableModule } from "@rx/table";
import { ApplicationBroadcaster } from "@rx/core";

import { ApplicationResponse } from "./domain/application-response";
import { ApplicationRequestHeaders } from "./domain/application-request-headers";
import { CanActivatePage, ApplicationJsonConfiguration, UserAuthorizationService, PageAccess, ApplicationService, ChangeDetectionGuard } from "./domain/authorization";

import { APP_LAZY_ROUTING } from './components/start/app.lazy.routing';
import { AppComponent } from './components/start/app.component';
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { TopBarComponent } from './components/shared/top-bar/top-bar.component';
import { FooterBarComponent } from './components/shared/footer-bar/footer-bar.component';

import { environment } from '../environments/environment';
import { UnAuthorizedComponent } from "app/components/unauthorized/unauthorized.component";
import { LoginComponent } from "app/components/login/login/login.component";
import { LoginService } from "app/components/login/login.service";
import { LoginModule } from "app/components/login/login/login.module";
import { NotFoundComponent } from "app/components/not-found/not-found.component";
import { ProjectModulesService } from 'app/components/project-module/project-modules/project-modules.service';
import { RecentActivityAndNotificationsService } from 'app/components/recent-activity-and-notification/recent-activity-and-notifications/recent-activity-and-notifications.service';
import { AppDirectiveModule } from 'app/components/shared/directives/app.directive.module';
import { OrientationVideoComponent } from './components/shared/top-bar/modal/orientation-video.component';



@NgModule({
    declarations: [
        AppComponent, SideBarComponent, TopBarComponent, UnAuthorizedComponent, NotFoundComponent, FooterBarComponent, TopBarComponent, OrientationVideoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule, RxTableModule,
        HttpModule, RxSecurityModule, CommonModule,
        RxFormsModule, RxViewModule, RxStorageModule, RxViewServiceModule, APP_LAZY_ROUTING, LoginModule, AppDirectiveModule
    ],
    providers: [PermissionService, RxValidation, LoginService, ApplicationBroadcaster,
        {
            provide: API_HOST_URI,
            useValue: environment.production ?

                //  'https://mynegotiations-rest.redsheetonline.com/' :
                //  'https://mynegotiations-rest.redsheetonline.com/'

                'http://localhost:8726/' : 'http://localhost:8726/'

                // 'http://redsheet-2021-api.live1.dev.radixweb.net/' :
                // 'http://redsheet-2021-api.live1.dev.radixweb.net/'

            // 'https://Redsheet-RW-REST.positivedev.co.uk/' : 'https://Redsheet-RW-REST.positivedev.co.uk/'

        }, { provide: 'RequestHeaders', useClass: ApplicationRequestHeaders },
        { provide: 'ResponseResult', useClass: ApplicationResponse }, RxHttp,
        { provide: 'PageAccess', useClass: PageAccess },
        { provide: 'ChangeDetectionGuard', useClass: ChangeDetectionGuard },
        UserAuthorizationService,
        CanActivatePage,
        ApplicationJsonConfiguration,
        PageAccess, RecentActivityAndNotificationsService,
        ApplicationService, ChangeDetectionGuard,
        ProjectModulesService
    ],
    exports: [RouterModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
