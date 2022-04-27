import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, RxDialog, DialogClick, } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { RolesService } from "app/components/roles/roles.service";
import { CommonLookups } from "app/lookups/CommonLookups";
import { Role, vRole } from "app/database-models";
import { RolesDomain } from "app/components/roles/domain/roles.domain";


@Component({
    templateUrl: './roles-list.component.html',
})
export class RolesListComponent extends RolesDomain implements OnInit, OnDestroy {
    roleList: vRole[];
    showComponent: boolean = false;
    listSubscription: Subscription;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private dialog: RxDialog,
        private popup: RxPopup,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private rolesService: RolesService,
        private toast: RxToast
    ) { super(); }
    ngOnInit(): void {
        this.rolesService.get().subscribe(roles => {
            this.roleList = roles;
            this.showComponent = true;
        });
    }
    deleteRoles(roles:Role):void{
        this.dialog.confirmation([roles.roleName], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.listSubscription = this.rolesService.delete(roles.roleId).subscribe(t => {
                    this.listSubscription.unsubscribe();
                    this.ngOnInit();
                }, error => {
                        this.toast.show(error, { status: 'error' });
                });
            }
        });
    }
    ngOnDestroy(): void {
        if (this.listSubscription)       
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
