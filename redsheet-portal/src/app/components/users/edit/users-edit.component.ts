import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation, RxMessageComponent } from '@rx/forms';
import { UsersService } from "app/components/users/users.service";
import { CommonLookups } from "app/lookups/CommonLookups";
import { UsersLookupGroup } from "app/components/users/domain/users.models";
import { UsersDomain } from "app/components/users/domain/users.domain";
import { User } from "app/database-models";
import { RxDialog } from '@rx/view';

@Component({
    templateUrl: './users-edit.component.html',
    entryComponents: [RxMessageComponent]
})
export class UsersEditComponent extends UsersDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    editSubscription: Subscription;
    usersEditFormGroup: FormGroup;
    usersLookupGroup: UsersLookupGroup;
    userId: number;
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
        private usersService: UsersService,
        private toast: RxToast
    ) {
        super();
        this.validationFailed = {};
        activatedRoute.params.subscribe((param: any) => this.userId = param['userId']);
    }
    ngOnInit(): void {
        this.validationFailed = {};
        this.usersService.group([this.userId], [CommonLookups.activeLanguages, CommonLookups.roles, CommonLookups.applicationTimeZone, CommonLookups.securityQuestions]).then((response: UsersLookupGroup) => {
            this.showComponent = true;
            this.usersLookupGroup = new UsersLookupGroup();
            this.usersLookupGroup = response;
            let userData = new User(this.usersLookupGroup.user)
            userData['isChangePassword'] = false;
            userData['password'] = "";
            userData['confirmPassword'] = "";
            this.usersEditFormGroup = this.validation.getFormGroup(userData);
        });
    }
    updateUsers(): void {
        if (this.usersEditFormGroup.value.isChangePassword) {
            this.usersEditFormGroup.value['userPassword'] = this.usersEditFormGroup.value['password']
            this.updateUserData();
        }
        else {
              this.usersEditFormGroup.value['userPassword'] = ""
              this.updateUserData();
        }
    }

    updateUserData(): void {
        this.usersEditFormGroup.value['password'] = ""
        //this.usersEditFormGroup.value['confirmPassword'] = ""
        this.usersService.put(this.usersEditFormGroup.value).subscribe(usersSearchResult => {
            this.router.navigate(['users']);
        }, error => {
            if (!error.status) {
                this.validationFailed = error;
                this.toast.show(error, { status: 'error' });
            }
        })
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
