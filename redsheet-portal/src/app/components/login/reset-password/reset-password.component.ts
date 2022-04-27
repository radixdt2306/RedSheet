import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxToast, RxPopup, PopoverModel, } from '@rx/view';
import { RxValidation, RxMessageComponent } from '@rx/forms';
import { ResetPasswordService } from "app/components/login/reset-password/reset-password.service";
import { SecurityVerificationForm, SecurityVerificationViewModel, UserCredentialViewModel, ChangeCredentialViewModel } from "app/components/login/domain/reset-password.models";
import { ResetPasswordDomain } from "app/components/login/domain/reset-password.domain";
import { PopoverComponent } from 'app/components/login/Popover/popover.component';


@Component({
    templateUrl: './reset-password.component.html',
    providers: [ResetPasswordService],
    entryComponents: [RxMessageComponent,PopoverComponent]
})
export class ResetPasswordComponent extends ResetPasswordDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    resetPasswordFormGroup: FormGroup;
    resetPasswordSubscription: Subscription;
    securityForm: any;
    email: string;
    verificationCode: string;
    popoverModel: PopoverModel;
    validationFailed: {
        [key: string]: any;
    };
    constructor(
        private validation: RxValidation,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private toast: RxToast,
        private resetPasswordService: ResetPasswordService,
        private popup: RxPopup,        
    ) {
        super();
        this.validationFailed = {};
        this.securityForm = {};
        this.activatedRoute.queryParams.subscribe(t => {
            this.email = t.email;
            this.verificationCode = t.token;
        })
    }
    ngOnInit(): void {
        //data-content="1. Have at least one number <br/>2. Have at least one capital letter <br/>3. Be at least 8 characters"
        this.validationFailed = {};
        this.resetPasswordFormGroup = this.validation.getFormGroup(new SecurityVerificationForm());
        this.resetPasswordFormGroup.controls.userName.patchValue(this.email);
        this.resetPasswordFormGroup.controls.verificationCode.patchValue(this.verificationCode);                
        this.popoverModel = new PopoverModel();
        this.popoverModel.component = PopoverComponent;
        this.popoverModel.trigger = "click";
        this.popoverModel.position = "right";        
        this.showComponent = true;
    }
    resetPassword(): void{
        
        let changeCredentialViewModel: ChangeCredentialViewModel = {
            userName: this.resetPasswordFormGroup.value.userName,
            verificationCode: this.resetPasswordFormGroup.value.verificationCode,
            password: this.resetPasswordFormGroup.value.password,
            confirmPassword: this.resetPasswordFormGroup.value.confirmPassword
        }
        this.resetPasswordService.putCredential(changeCredentialViewModel).subscribe(t => {            
            this.popup.hide(ResetPasswordComponent);
            this.toast.show(t.validationMessage, { status: '' });
        }, error => {            
            if (!error.ok) {
                this.toast.show(error.validationMessage, { status: 'error' });
            }
        });   
    }
    checkedpassword(): boolean {
        let isValid: boolean = false;
        if (this.resetPasswordFormGroup.value.password == undefined || this.resetPasswordFormGroup.value.password == "") {
            isValid = true;
        }
        else if (this.resetPasswordFormGroup.value.confirmPassword == undefined || this.resetPasswordFormGroup.value.confirmPassword == "") {
            isValid = true;
        }
        else {
            if (this.resetPasswordFormGroup.value.password != this.resetPasswordFormGroup.value.confirmPassword) {
                isValid = true;
            }
        }
        return isValid;
    }
    ngOnDestroy(): void {
        super.destroy();
    }
}
