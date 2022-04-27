import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation, RxMessageComponent } from '@rx/forms';
import { CommonLookups } from "app/lookups/CommonLookups";
import { User } from "app/database-models";
import { RxDialog } from '@rx/view';
import { UserProfileLookupGroup, UserProfileModel } from "./domain/user-profile.model";
import { UserProfileDomain } from "./domain/user-profile.domain";
import { UserProfileService } from "./user-profile.service";
import { UsersService } from "app/components/users/users.service";
import { ApplicationBroadcaster } from "@rx/core";
import { HIDE_SIDE_BAR } from "app/const";

@Component({
    templateUrl: './user-profile.component.html',
    entryComponents: [RxMessageComponent]
})
export class UserProfileComponent extends UserProfileDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    editSubscription: Subscription;
    userProfileFormGroup: FormGroup;
    usersLookupGroup: UserProfileLookupGroup;
    userId: number;
    uniqueIdentity: string;
    email: string;
    validationFailed: {
        [key: string]: any;
    };
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private popup: RxPopup,
        private router: Router,
        private dialog: RxDialog,
        private componentFactoryResolver: ComponentFactoryResolver,
        private usersProfileService: UserProfileService,
        private usersService: UsersService,
        applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        this.validationFailed = {};
        applicationBroadcaster.allTypeBroadCast(HIDE_SIDE_BAR);
    }
    ngOnInit(): void {
        
        this.validationFailed = {};
        this.usersService.lookup([CommonLookups.activeLanguages, CommonLookups.roles, CommonLookups.applicationTimeZone, CommonLookups.securityQuestions]).then((response: UserProfileLookupGroup) => {
            this.usersLookupGroup = new UserProfileLookupGroup();
            this.usersLookupGroup = response;
            
            this.usersProfileService.get().subscribe(user => {
                 
                this.uniqueIdentity = user.uniqueIdentity;
                this.email = user.email;
                this.userProfileFormGroup = this.validation.getFormGroup(new UserProfileModel(user));
                this.showComponent = true;
            });
        });
    }

    updateUsers(): void {
        if (this.userProfileFormGroup.value.isChangePassword) {            
            this.userProfileFormGroup.value['userPassword'] = this.userProfileFormGroup.value['password']
            this.updateUserData();
            this.router.navigate(['dashboard']);
        }
        else {
            this.userProfileFormGroup.value['userPassword'] = ""
            this.updateUserData();
            this.router.navigate(['dashboard']);
        }
    }


    
    updateUserData(): void {
        
        this.userProfileFormGroup.value['password'] = ""
        this.userProfileFormGroup.controls.uniqueIdentity.setValue(this.uniqueIdentity);
        this.userProfileFormGroup.controls.email.setValue(this.email);
        this.usersService.put(this.userProfileFormGroup.value).subscribe(usersSearchResult => {
            this.router.navigate(['dashboard']);
        }, error => {
            if (!error.status) {
                this.validationFailed = error;
            }
        })
    }

    resetUsers(): void {
        this.usersLookupGroup.user['isChangePassword'] = false;
        this.usersLookupGroup.user['password'] = "";
        this.usersLookupGroup.user['confirmPassword'] = "";
        this.userProfileFormGroup = this.validation.getFormGroup(this.usersLookupGroup.user)
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
