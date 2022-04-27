import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation, RxMessageComponent } from '@rx/forms';
import { RolesService } from "app/components/roles/roles.service";
import { CommonLookups } from "app/lookups/CommonLookups";
import { RolesLookupGroup } from "app/components/roles/domain/roles.models";
import { RolesDomain } from "app/components/roles/domain/roles.domain";
import { Role } from "app/database-models";


@Component({
    templateUrl: './roles-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class RolesAddComponent extends RolesDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    addSubscription: Subscription;
    rolesAddFormGroup: FormGroup;
    rolesLookupGroup: RolesLookupGroup;
    validationFailed: {
        [key: string]: any;
    };
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private popup: RxPopup,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private rolesService: RolesService,
        private toast: RxToast,
    ) {
        super();
        this.validationFailed = {};
    }
    ngOnInit(): void {
        this.validationFailed = {};
        let role: Role = new Role();
        // this.rolesService.lookup([CommonLookups.status]).then((response: RolesLookupGroup) => {
        this.showComponent = true;
        //this.rolesLookupGroup = new RolesLookupGroup();
        //this.rolesLookupGroup = response;
        this.rolesAddFormGroup = this.validation.getFormGroup(new Role());
        this.rolesAddFormGroup.controls.status.patchValue(12)
        this.showComponent = true;
        //});

    }
    saveRoles(): void {
        this.rolesService.post(this.rolesAddFormGroup.value).subscribe(roles => {
            this.router.navigate(['roles']);
        }, error => {
            if (!error.status) {
                this.validationFailed = error;
                this.toast.show(error, { status: 'error' });
            }
        })
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}
