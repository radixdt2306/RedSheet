import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { RxToast, RxPopup, } from '@rx/view';
import { RxValidation, RxMessageComponent } from '@rx/forms';
import { ForgotPasswordService } from "app/components/login/forgot-password/forgot-password.service";
import { SecurityVerificationForm, SecurityVerificationViewModel, UserCredentialViewModel, ChangeCredentialViewModel } from "app/components/login/domain/forgot-password.models";
import { ForgotPasswordDomain } from "app/components/login/domain/forgot-password.domain";


@Component({
    templateUrl: './forgot-password.component.html',
    providers: [ForgotPasswordService],
    entryComponents: [RxMessageComponent]
})
export class ForgotPasswordComponent extends ForgotPasswordDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    forgotPasswordFormGroup: FormGroup;
    userCredentialViewModel: UserCredentialViewModel;
    wizardList: any[];
    selectedWizard: any;
    forgotPasswordSubscription: Subscription;
    validationFailed: {
        [key: string]: any;
    };
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private forgotPasswordService: ForgotPasswordService,
        private formBuilder: FormBuilder,
        private popup: RxPopup,
    ) {
        super();
        this.validationFailed = {};
    }
    ngOnInit(): void {
        this.validationFailed = {};
        this.forgotPasswordFormGroup = this.validation.getFormGroup(new SecurityVerificationForm());
        this.wizardList = [
            { stepNo: 1, title: 'Enter User Name' },
            { stepNo: 2, title: 'Please Enter Security Answer' },
            { stepNo: 3, title: 'Reset Password' }
        ]
        this.selectedWizard = { stepNo: 1, title: 'Enter User Name' };
        this.showComponent = true;
    }

    forgotPassword(): void {    
              
        this.changeWizardStepng(this.wizardList[0]);
    }


    changeWizardStepng(wizard: any): void {
        
        if (wizard.stepNo == 1) {
            
            if (this.forgotPasswordFormGroup.value.userName != undefined && this.forgotPasswordFormGroup.value.userName != "") {
                let userCredentialViewModel: UserCredentialViewModel = {
                    userName: this.forgotPasswordFormGroup.value.userName,
                    password: ""
                }
                this.forgotPasswordService.post(userCredentialViewModel).subscribe(t => {
                    
                    // this.selectedWizard = this.wizardList.where(a => a.stepNo == (wizard.stepNo + 1)).firstOrDefault();
                    // this.forgotPasswordFormGroup.controls.securityQuestion.patchValue(securityQuestionName.securityQuestionName);                    
                    this.toast.show(t.validationMessage, { status: '' });
                }, error => {
                    if (!error.ok) {                        
                        this.toast.show(error.validationMessage, { status: 'error' });
                    }
                });
            }
        }
        else if (wizard.stepNo == 2) {
            // if (this.forgotPasswordFormGroup.value.securityAnswer != undefined && this.forgotPasswordFormGroup.value.securityAnswer != "") {
            //     let securityVerificationViewModel: SecurityVerificationViewModel = {
            //         userName: this.forgotPasswordFormGroup.value.userName,
            //         securityQuestion: this.forgotPasswordFormGroup.value.securityQuestion,
            //         securityAnswer: this.forgotPasswordFormGroup.value.securityAnswer
            //     }
            //     this.forgotPasswordService.postVerification(securityVerificationViewModel).subscribe(verification => {
            //         this.selectedWizard = this.wizardList.where(a => a.stepNo == (wizard.stepNo + 1)).firstOrDefault();
            //         this.forgotPasswordFormGroup.controls.verificationCode.patchValue(verification);
            //     }, error => {
            //         if (!error.ok) {
            //             this.toast.show(error._body, { status: 'error' });
            //         }
            //     });
            // }
        }
        else if (wizard.stepNo == 3) {
              let changeCredentialViewModel: ChangeCredentialViewModel = {
                  userName: this.forgotPasswordFormGroup.value.userName,
                  verificationCode: this.forgotPasswordFormGroup.value.verificationCode,
                  password: this.forgotPasswordFormGroup.value.password,
                  confirmPassword: this.forgotPasswordFormGroup.value.confirmPassword
              }
              this.forgotPasswordService.putCredential(changeCredentialViewModel).subscribe(verification => {
                  this.popup.hide(ForgotPasswordComponent);
              }, error => {
                  if (!error.ok) {
                      this.toast.show(error, { status: 'error' });
                  }
              });
        }
    }
    checkedpassword(): boolean {
        let isValid: boolean = false;
        if (this.forgotPasswordFormGroup.value.password == undefined || this.forgotPasswordFormGroup.value.password == "") {
            isValid = true;
        }
        else if (this.forgotPasswordFormGroup.value.confirmPassword == undefined || this.forgotPasswordFormGroup.value.confirmPassword == "") {
            isValid = true;
        }
        else {
            if (this.forgotPasswordFormGroup.value.password != this.forgotPasswordFormGroup.value.confirmPassword) {
                isValid = true;
            }
        }
        return isValid;
    }
    backWizardStep(wizard): void {
        this.selectedWizard = this.wizardList.where(a => a.stepNo == (wizard.stepNo - 1)).firstOrDefault();
    }
    closeForgotPassword(): void {
        this.popup.hide(ForgotPasswordComponent);
    }
    ngOnDestroy(): void {
        super.destroy();
    }
}
