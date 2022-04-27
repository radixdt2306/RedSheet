import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, RxDialog, DialogClick, } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { UsersService } from "app/components/users/users.service";
import { CommonLookups } from "app/lookups/CommonLookups";
import { UsersLookupGroup, UsersSearchViewModel } from "app/components/users/domain/users.models";
import { UsersDomain } from "app/components/users/domain/users.domain";
import { User } from "app/database-models";


@Component({
    templateUrl: './users-list.component.html',
})
export class UsersListComponent extends UsersDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    listSubscription: Subscription;
    usersSearchFormGroup: FormGroup;
    usersLookupGroup:UsersLookupGroup;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private dialog: RxDialog,
        private popup: RxPopup,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private usersService: UsersService,
        private toast: RxToast

    ) { super();
     }

    ngOnInit(): void {
         this.usersService.lookup([
            CommonLookups.activeLanguages, CommonLookups.roles,CommonLookups.applicationTimeZone,CommonLookups.users
        ]).then((response: UsersLookupGroup) => {
                this.showComponent = true;
                this.usersLookupGroup = new UsersLookupGroup();
                this.usersLookupGroup = response;
                this.usersSearchFormGroup = this.validation.getFormGroup(new UsersSearchViewModel());
                this.searchUsers();
            });
    }

    searchUsers(): void{
        this.usersService.searchUsersList(this.usersSearchFormGroup.value).subscribe(usersSearchResult => {
            this.usersLookupGroup.userList = [];
            this.usersLookupGroup.userList = usersSearchResult;
        },error => {
            if (!error.status) {
            }
        })
    }
    deleteUsers(users:User):void{
        this.dialog.confirmation([users.userName], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.listSubscription = this.usersService.delete(users.userId).subscribe(t => {
                    this.listSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                    this.toast.show(error, { status: 'error' });
                });
            }
        });
    }
   

    resetSearchUsers():void{
        this.usersSearchFormGroup.reset(new UsersSearchViewModel())
        this.searchUsers();
    }
    
    ngOnDestroy(): void {
        if (this.listSubscription)       
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
