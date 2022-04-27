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


@Component({
    templateUrl: './users-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class UsersAddComponent extends UsersDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    addSubscription: Subscription;
    usersAddFormGroup: FormGroup;
    usersLookupGroup: UsersLookupGroup;
    validationFailed: {
        [key: string]: any;
    };
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private popup: RxPopup,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private usersService: UsersService,
        private toast: RxToast
    ) {
        super();
        this.validationFailed = {};
    }
    ngOnInit(): void {
        this.validationFailed = {};
        this.usersService.lookup([CommonLookups.activeLanguages, CommonLookups.roles, CommonLookups.applicationTimeZone, CommonLookups.securityQuestions]).then((response: UsersLookupGroup) => {
            this.showComponent = true;
            this.usersLookupGroup = new UsersLookupGroup();
            this.usersLookupGroup = response;
            let user: User = new User();
            user['confirmPassword'] = "";
            this.usersAddFormGroup = this.validation.getFormGroup(user);
            this.usersAddFormGroup.controls.statusId.patchValue(12)
        });
    }
    saveUsers(): void {
        //if (this.usersAddFormGroup.value.password == this.usersAddFormGroup.value.confirmPassword) {
            this.usersAddFormGroup.value.userPassword = this.usersAddFormGroup.value.password
            this.usersAddFormGroup.value.password = "";
            //this.usersAddFormGroup.value.confirmPassword = "";
            this.usersService.post(this.usersAddFormGroup.value).subscribe(usersSearchResult => {
                this.router.navigate(['users']);
            }, error => {
                if (!error.status) {
                    this.validationFailed = error;
                    this.toast.show(error, { status: 'error' });
                }
            })
        //}
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}
