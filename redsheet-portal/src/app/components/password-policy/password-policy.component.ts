import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation, RxMessageComponent } from '@rx/forms';


import { PasswordPolicyDomain } from './domain/password-policy.domain';
import { CommonLookups } from "app/lookups/CommonLookups";
import { PasswordPolicy } from "app/database-models";
import { PasswordPolicyService } from "./password-policy.service";

@Component({
    templateUrl: './password-policy.component.html',
    entryComponents: [RxMessageComponent]
})
export class PasswordPolicyComponent extends PasswordPolicyDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    listSubscription: Subscription;
    passwordPolicyFormGroup: FormGroup;
    validationFailed: {
        [key: string]: any;
    };
    constructor(
        private validation: RxValidation,
        private componentFactoryResolver: ComponentFactoryResolver,
        private passwordPolicyService: PasswordPolicyService,
    ) {
        super();
        this.validationFailed = {};
     }

    ngOnInit(): void {
        this.passwordPolicyService.get().subscribe(passwordPolicyData => {
            this.validationFailed = {};
            if (passwordPolicyData != null)
                this.passwordPolicyFormGroup = this.validation.getFormGroup(new PasswordPolicy(passwordPolicyData[0]));
            else
            {
                this.passwordPolicyFormGroup = this.validation.getFormGroup(new PasswordPolicy());
            }
            this.showComponent = true;
        })
    }
    resetPasswordPolicy(): void{
        this.passwordPolicyFormGroup.reset(new PasswordPolicy())
        this.ngOnInit();
    }
    savePasswordPolicy(): void{
        this.passwordPolicyService.put(this.passwordPolicyFormGroup.value).subscribe(t => { }, error => {
            if (!error.status) {
                this.validationFailed = error;
            }
        });
        
    }
    ngOnDestroy(): void {
        if (this.listSubscription)       
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
