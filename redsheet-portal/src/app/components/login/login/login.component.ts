import { Component, EventEmitter, Input, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, RxDialog } from "@rx/view";
import { RxStorage } from "@rx/storage";

import { RxValidation } from '@rx/forms';
import { user, UserPermissionCache } from "@rx/security";
import { ApplicationConfiguration, ApplicationPage, ApplicationBroadcaster } from "@rx/core";
import { Language } from "app/database-models";
import { UserCredentialModel } from "app/components/login/domain/login.models";
import { ApplicationService } from "app/domain/authorization";
import { LoginService } from "app/components/login/login.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy, OnInit {
    languages: Language[]
    loginFormGroup: FormGroup;
    userCredentialViewModel: UserCredentialModel;
    minutes: number;
    loginSubscription: Subscription;
    isApplied: boolean = false;
    state: string = 'in';
    timeOutId: number;
    username: string;
    showComponent: boolean = false;
    focusedElement: string;
    emptyElement: any;
	uid: string = undefined;
    trg: string = undefined;
    ssoKey: string = undefined;
    constructor(
        private loginService: LoginService,
        private applicationBroadCaster: ApplicationBroadcaster,
        private toast: RxToast,
        private popup: RxPopup,
        private storage: RxStorage,
        private dialog: RxDialog,
        private applicationService: ApplicationService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private activatedRoute: ActivatedRoute,
    ) {
        this.userCredentialViewModel = new UserCredentialModel();
        // this.userCredentialViewModel.username = "admin";
        // this.userCredentialViewModel.password = "admin";
        this.popup.setComponent(componentFactoryResolver);
        //this.minutes = ApplicationConfiguration.get("authorization").cacheMinutes;
		this.activatedRoute.queryParams.subscribe(params =>{
            this.uid = params["uid"];
            this.trg = params["trg"];
            this.ssoKey = params["ssoKey"];
        });
    }

    ngOnInit() {
        if (this.uid != undefined && this.trg != undefined && this.ssoKey != undefined) {
            this.login();
        }
        else {
            this.timeOutId = window.setTimeout(() => {
                window.clearTimeout(this.timeOutId);
                this.isApplied = true;
                this.languages = ApplicationConfiguration.get('languages')
                this.emptyElement = {};
                this.changeItem('username')
                this.changeItem('password')
                this.showComponent = true;

            }, 500)
        }
        

    }
    forgotPassword(): void {
        //this.popup.show(ForgotPasswordComponent).then(t => this.ngOnInit());
    }
    login(): void {
        
        this.isApplied = false;
        if (this.loginSubscription)
            this.loginSubscription.unsubscribe();
        this.userCredentialViewModel.failedCount = this.storage.local.get('failedCount') == undefined ? 0 : this.storage.local.get('failedCount');
        this.loginSubscription = this.loginService.post(this.userCredentialViewModel, this.uid,this.trg,this.ssoKey).subscribe(t => {
            if (t.failedLogin) {
                this.toast.show(t.validationMessage, { status: 'error' });
            }
            else {
                this.storage.local.save('auth', t.token);
                user.data = { 'fullName': t.fullName, 'roleId': t.roleId, 'userName': t.userName, 'userId': t.userId, }
                user.authorizationPermissionItem = t.modules;
                for (var rootModuleId in t.modules) {
                    let userPermissionCache = new UserPermissionCache({ rootModuleId: parseInt(rootModuleId), permission: t.modules[rootModuleId], requestedDate: this.getDate() });
                    user.permissions.push(userPermissionCache);
                }
                this.timeOutId = window.setTimeout(() => {
                    window.clearTimeout(this.timeOutId);
                    this.applicationBroadCaster.loginBroadCast(true)
                }, 50);
                //this.storage.session.save('academyLink',t.academyUrl);
                document.cookie = "academyUrl="+t.academyUrl+";samesite=Lax"
            }
            this.storage.local.save('failedCount', t.failedCount);
        }, error => {
            window.clearTimeout(1);
            this.applicationBroadCaster.loginBroadCast(false);
            this.isApplied = true;
            //this.dialog.alert("Invalid Username and Password", error);
            if(error.validationMessage == undefined || error.validationMessage == null || error.validationMessage == "" )
            {
                error.validationMessage = "Invalid Username and Password"
            }
            this.dialog.alert(error.validationMessage, error);
        });

        
    }
    isFocused(focusedElement) {
        this.focusedElement = focusedElement;
    }
    changeItem(changeData) {
        if (this.userCredentialViewModel[changeData] == undefined || this.userCredentialViewModel[changeData] == "" || this.userCredentialViewModel[changeData] == null) {
            this.emptyElement[changeData] = true;
        }
        else {
            this.emptyElement[changeData] = false;
        }
    }
    changeLanguage(value: HTMLSelectElement) {
        var languageName = (<HTMLOptionElement>value.selectedOptions[0]).innerText;
        this.applicationService.getConfiguration(languageName).subscribe(t => {
            ApplicationConfiguration.set(t);
            var applicationModuleId = ApplicationPage.get("applicationModuleId");
            this.applicationService.getModuleContents(languageName, ApplicationPage.get("action"), applicationModuleId).subscribe(moduleContents => {
                ApplicationConfiguration.setLanguages(this.languages);
                ApplicationConfiguration.setDefaultLanguage(languageName);
                ApplicationPage.addOrUpdateModuleContent(applicationModuleId,moduleContents);
            })
        });
    }
    getDate(): Date {
        let now = new Date();
        return new Date(now.getTime() + this.minutes * 60000)
    }
    ngOnDestroy(): void {
        if (this.loginSubscription)
            this.loginSubscription.unsubscribe();
    }
}
